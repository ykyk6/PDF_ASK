from typing import List
import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter


def read_pdf(file_path: str) -> str:
    """
    使用 pdfplumber 讀取 PDF 檔案內容，回傳合併後的純文字。
    """
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text
    return text


def split_text(text: str, chunk_size: int = 500, chunk_overlap: int = 50) -> List[str]:
    """
    使用 LangChain 的 TextSplitter 將長文本切分成多個 chunk。
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", ".", "!", "?", " "]
    )
    return splitter.split_text(text)


if __name__ == "__main__":
    # 範例用法
    pdf_path = "example.pdf"  # 請替換成你的 PDF 路徑
    content = read_pdf(pdf_path)
    chunks = split_text(content)
    print(f"共切分為 {len(chunks)} 段")
    for i, chunk in enumerate(chunks[:3]):
        print(f"--- Chunk {i+1} ---\n{chunk}\n") 