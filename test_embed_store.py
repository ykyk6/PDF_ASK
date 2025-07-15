from dotenv import load_dotenv
import os
from pdf_utils import read_pdf, split_text
from vector_store import embed_and_store

load_dotenv()

# 1. 檢查 OpenAI API 金鑰
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("[錯誤] 尚未設置 OPENAI_API_KEY 環境變數！")
    print("請在命令列執行：set OPENAI_API_KEY=你的金鑰")
    exit(1)
else:
    print("[OK] 已偵測到 OPENAI_API_KEY。")

# 2. 設定 PDF 路徑
pdf_path = "example.pdf"  # 請改成你的 PDF 路徑
if not os.path.exists(pdf_path):
    print(f"[錯誤] 找不到 PDF 檔案：{pdf_path}")
    exit(1)
else:
    print(f"[OK] 找到 PDF 檔案：{pdf_path}")

# 3. 讀取 PDF
text = read_pdf(pdf_path)
if not text.strip():
    print("[錯誤] PDF 內容為空，請檢查檔案是否正確。")
    exit(1)
else:
    print(f"[OK] 成功讀取 PDF，字數：{len(text)}")

# 4. 切分文本
chunks = split_text(text)
print(f"[OK] 成功切分文本，共 {len(chunks)} 段。")

# 5. 向量化並存入 ChromaDB
try:
    db = embed_and_store(chunks)
    print("[OK] 向量化並存入 ChromaDB 成功！")
except Exception as e:
    print(f"[錯誤] 向量化或存入 ChromaDB 失敗：{e}")
    exit(1) 