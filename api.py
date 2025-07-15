from fastapi import FastAPI, File, UploadFile, Query
from pydantic import BaseModel
from dotenv import load_dotenv
from vector_store import embed_and_store, load_chroma
from pdf_utils import read_pdf, split_text
from langchain.llms import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import os
import hashlib

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PDF_HASH_DIR = "pdf_hashes"
CHROMA_DIR = "chroma_db"
os.makedirs(PDF_HASH_DIR, exist_ok=True)

class QARequest(BaseModel):
    question: str

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_location = f"uploaded_{file.filename}"
    with open(file_location, "wb") as f:
        content = await file.read()
        f.write(content)
    # 計算 PDF 檔案 hash
    pdf_hash = hashlib.md5(content).hexdigest()
    hash_path = os.path.join(PDF_HASH_DIR, f"{pdf_hash}.txt")
    # 檢查 hash 是否已存在
    if os.path.exists(hash_path):
        return {"message": f"{file.filename} はすでに解析済みです。"}
    # 解析並 embedding
    text = read_pdf(file_location)
    chunks = split_text(text)
    embed_and_store(chunks, persist_directory=CHROMA_DIR)
    # 記錄 hash
    with open(hash_path, "w") as f:
        f.write(file.filename)
    return {"message": f"{file.filename} のアップロードと解析が完了しました。"}

@app.post("/ask")
def ask_pdf(data: QARequest):
    question = data.question
    vectordb = load_chroma(persist_directory=CHROMA_DIR)
    docs = vectordb.similarity_search(question, k=3)
    context = "\n".join([doc.page_content for doc in docs])
    llm = OpenAI(temperature=0)
    prompt = (
        "あなたはプロのドキュメントアシスタントです。以下のPDF内容に基づいて、"
        "内容のみを使って質問に答えてください。想像で補足しないでください。\n"
        f"{context}\n\n"
        f"質問：{question}\n"
        "箇条書きまたは要約で答えてください："
    )
    answer = llm(prompt)
    return {"answer": answer, "context": context} 
  