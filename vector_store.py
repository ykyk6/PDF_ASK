from typing import List
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma


def embed_and_store(chunks: List[str], persist_directory: str = "chroma_db") -> Chroma:
    """
    將文本 chunks 轉成向量並存入 ChromaDB。
    :param chunks: 切分後的文本段落
    :param persist_directory: ChromaDB 儲存目錄
    :return: Chroma 向量資料庫物件
    """
    # 初始化 OpenAI Embeddings
    embeddings = OpenAIEmbeddings()
    # 建立 Chroma 向量資料庫，並存入文本與向量
    vectordb = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        persist_directory=persist_directory
    )
    vectordb.persist()  # 儲存資料庫到磁碟
    return vectordb


def load_chroma(persist_directory: str = "chroma_db") -> Chroma:
    """
    載入已存在的 ChromaDB。
    :param persist_directory: ChromaDB 儲存目錄
    :return: Chroma 向量資料庫物件
    """
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
    return vectordb


if __name__ == "__main__":
    # 範例用法
    from pdf_utils import read_pdf, split_text
    pdf_path = "example.pdf"  # 請替換成你的 PDF 路徑
    text = read_pdf(pdf_path)
    chunks = split_text(text)
    db = embed_and_store(chunks)
    print("已完成向量化並存入 ChromaDB！") 