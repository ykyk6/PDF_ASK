import sqlite3
import os

# 檢查 ChromaDB 的內容
conn = sqlite3.connect('chroma_db/chroma.sqlite3')
cursor = conn.cursor()

# 查看所有表格
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
print("ChromaDB 中的表格:")
for table in tables:
    print(f"- {table[0]}")

# 檢查每個表格的結構和內容
for table in tables:
    table_name = table[0]
    print(f"\n=== 表格: {table_name} ===")
    
    # 查看表格結構
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = cursor.fetchall()
    print("欄位結構:")
    for col in columns:
        print(f"  {col[1]}: {col[2]}")
    
    # 查看前幾筆資料
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 3")
    rows = cursor.fetchall()
    print(f"前 3 筆資料:")
    for i, row in enumerate(rows):
        print(f"  Row {i+1}: {row}")

conn.close()

# 檢查是否有其他 ChromaDB 相關檔案
print("\n=== ChromaDB 目錄內容 ===")
for root, dirs, files in os.walk('chroma_db'):
    for file in files:
        file_path = os.path.join(root, file)
        print(f"- {file_path}")
