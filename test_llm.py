import os
from dotenv import load_dotenv
from vector_store import load_chroma
from langchain.llms import OpenAI

# 載入環境變數
load_dotenv()

# 載入 ChromaDB
vectordb = load_chroma()

# 初始化 LLM
llm = OpenAI(temperature=0)

# 測試問題
question = "這個PDF的內容是什麼？"
print(f"問題: {question}")

# 檢索相關文檔
docs = vectordb.similarity_search(question, k=3)
context = "\n".join([doc.page_content for doc in docs])

print(f"\n檢索到的上下文長度: {len(context)}")
print(f"上下文前 200 字符: {context[:200]}...")

# 組合提示詞
prompt = (
    "你是一位專業的文件助理。以下是 PDF 內容：\n"
    f"{context}\n\n"
    f"問題：{question}\n"
    "請直接用繁體中文完整回答，不要條列式，不要摘要，不要重述指示，也不要加上任何額外說明或前後文，只輸出最終答案。"
)

print(f"\n提示詞長度: {len(prompt)}")
print(f"提示詞前 300 字符: {prompt[:300]}...")

# 呼叫 LLM
print("\n=== LLM 回答 ===")
answer = llm(prompt)
print(answer)
