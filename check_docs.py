import sqlite3

# 檢查 ChromaDB 中儲存的文檔內容
conn = sqlite3.connect('chroma_db/chroma.sqlite3')
cursor = conn.cursor()

# 查看文檔內容
cursor.execute('SELECT string_value FROM embedding_metadata WHERE key = "chroma:document" LIMIT 3')
rows = cursor.fetchall()

print("ChromaDB 中儲存的文檔內容:")
for i, row in enumerate(rows):
    print(f"\n=== 文檔 {i+1} ===")
    content = row[0]
    print(f"長度: {len(content)}")
    print(f"前 200 字符: {repr(content[:200])}")
    print(f"是否包含 '偽物': {'偽物' in content}")
    print(f"是否包含 'fake': {'fake' in content.lower()}")

conn.close()
