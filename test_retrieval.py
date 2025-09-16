import os
from dotenv import load_dotenv
from vector_store import load_chroma

# 載入環境變數
load_dotenv()

# 載入 ChromaDB
vectordb = load_chroma()

# 測試檢索
question = "這個PDF的內容是什麼？"
print(f"問題: {question}")

# 檢索相關文檔
docs = vectordb.similarity_search(question, k=3)
print(f"\n檢索到 {len(docs)} 個文檔:")

for i, doc in enumerate(docs, 1):
    print(f"\n--- 文檔 {i} ---")
    print(f"內容長度: {len(doc.page_content)}")
    print(f"內容: {doc.page_content[:200]}...")
    print(f"是否包含 '偽物': {'偽物' in doc.page_content}")
    print(f"是否包含 'fake': {'fake' in doc.page_content.lower()}")
