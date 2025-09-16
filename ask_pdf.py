from dotenv import load_dotenv
import os
from vector_store import load_chroma
from langchain.llms import OpenAI

# 讀取 .env 檔案，取得 API 金鑰
load_dotenv()

# 載入 ChromaDB
vectordb = load_chroma()

# 初始化 OpenAI LLM
# 建立 LLM 物件，temperature 控制隨機性，0 表示最確定，1 表示最不確定
llm = OpenAI(temperature=0)

print("PDF 問答小助手 (輸入 'exit' 離開)")
while True:
    question = input("請輸入你的問題：")
    if question.lower() in ["exit", "quit", "q"]:
        print("再見！")
        break
    # 1. 相似度檢索，找出最相關的 5 段
    docs = vectordb.similarity_search(question, k=5)
    print("\n[檢索到的相關段落]")
    for i, doc in enumerate(docs, 1):
        print(f"--- 段落 {i} ---\n{doc.page_content}\n")
    context = "\n".join([doc.page_content for doc in docs])
    # 2. 組合 prompt
    prompt = (
        "你是一個專業的文件助理，請根據下列 PDF 內容，"
        "只用內容本身來回答問題，不要發揮想像，也不要補充未提及的資訊。\n"
        f"{context}\n\n"
        f"問題：{question}\n"
        "請直接完整回答，不要條列式，不要摘要，不要重述指示，也不要加上任何額外說明或前後文，只輸出最終答案。"
    )
    # 3. 呼叫 LLM 產生答案
    print("[AI 正在思考...]")
    answer = llm(prompt)
    print(f"\nAI 回答：{answer}\n")
