import React, { useState, useRef, useEffect } from 'react';
import {
  Bg, MainContainer, CenterIconArea, IconBase1, IconBase2, IconBase3, FolderIconArea, FolderOverlay, FolderContent, FolderIcon, OrbitArea, OrbitCircle, OrbitDot, StatusIndicator, StatusCircle, Title, SubTitle, Grid, Card, CardTitle, UploadArea, UploadText, FileName, StatusList, StatusItem, GuideList, ChatArea, ChatHistory, ChatBubble, Bubble, ChatInputArea, ChatInput, SendButton, FullScreenLoader, Dots
} from './PDFQAAssistantStyles';
import { Upload, MessageCircle, FileText, PieChart, BarChart3, Search, Send, Loader2, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';

const PDFQAAssistant = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitAngle(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setIsProcessing(true);
      // 上傳 PDF 到後端
      const formData = new FormData();
      formData.append('file', uploadedFile);
      try {
        const response = await axios.post(`${apiUrl}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setIsProcessing(false);
        setIsReady(true);
        setMessages([{
          type: 'system',
          content: `📄 ${uploadedFile.name} のアップロードと解析が完了しました。ご質問をどうぞ。`
        }]);
      } catch (error) {
        setIsProcessing(false);
        setMessages([{
          type: 'system',
          content: '❌ PDFのアップロードまたは解析に失敗しました。'
        }]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputMessage('');
    setIsSending(true);
    try {
      const response = await axios.post(`${apiUrl}/ask`, {
        question: userMessage
      });
      const aiResponse = response.data.answer;
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { type: 'system', content: '❌ サーバーエラーが発生しました。しばらくしてから再試行してください。' }
      ]);
    }
    setIsSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
      {isProcessing && (
        <FullScreenLoader>
          <Loader2 size={64} />
          <div style={{ marginTop: 16 }}>ファイルを処理中...</div>
        </FullScreenLoader>
      )}
      <Bg />
      <MainContainer>
        <CenterIconArea>
          <IconBase1 />
          <IconBase2 />
          <IconBase3 />
          <FolderIconArea>
            <FolderOverlay />
            <FolderContent>
              <FolderIcon><FileText size={32} color="#fff" /></FolderIcon>
              <FolderIcon><PieChart size={32} color="#fff" /></FolderIcon>
              <FolderIcon><BarChart3 size={32} color="#fff" /></FolderIcon>
              <FolderIcon><Search size={32} color="#fff" /></FolderIcon>
            </FolderContent>
            <OrbitArea>
              <OrbitCircle>
                <OrbitDot angle={orbitAngle}>
                  <div className="blur" />
                </OrbitDot>
              </OrbitCircle>
            </OrbitArea>
            <StatusIndicator>
              {isProcessing && (
                <StatusCircle color="#facc15">
                  <Loader2 size={16} />
                </StatusCircle>
              )}
              {isReady && (
                <StatusCircle color="#22c55e">
                  <Check size={16} />
                </StatusCircle>
              )}
            </StatusIndicator>
          </FolderIconArea>
        </CenterIconArea>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title>PDF質問アシスタント</Title>
          <SubTitle>PDFファイルをアップロードして、AIに素早く答えを見つけてもらいましょう</SubTitle>
        </div>
        <Grid>
          {/* 使い方 Card 移到最左邊 */}
          <Card>
            <CardTitle>
              <MessageCircle size={20} style={{ marginRight: 3, color: '#a78bfa' }} />
              使い方
            </CardTitle>
            <GuideList>
              <div>1. PDFファイルをアップロード</div>
              <div>2. システム処理を待つ</div>
              <div>3. 質問を入力</div>
              <div>4. AIの回答を得る</div>
            </GuideList>
          </Card>
          {/* 文件上傳區 */}
          <Card>
            <CardTitle>
              <Upload size={20} style={{ marginRight: 3, color: '#fb923c' }} />
              PDFファイルをアップロード
            </CardTitle>
            <UploadArea onClick={() => fileInputRef.current?.click()}>
              {file ? (
                <div>
                  <Check size={32} style={{ margin: '0 auto 0.5rem', color: '#16a34a' }} />
                  <FileName>{file.name}</FileName>
                  {isProcessing && (
                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Loader2 size={16} />
                      <span style={{ fontSize: '0.9rem', marginLeft: 8 }}>処理中...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Upload size={32} style={{ margin: '0 auto 0.5rem', color: '#fb923c' }} />
                  <UploadText>クリックしてPDFファイルを選択</UploadText>
                </div>
              )}
            </UploadArea>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </Card>
          {/* 處理狀態 */}
          <Card>
            <CardTitle>
              <AlertCircle size={20} style={{ marginRight: 3, color: '#3b82f6' }} />
              処理状況
            </CardTitle>
            <StatusList>
              <StatusItem active={!!file}>
                <div className="dot" />
                <span>PDFファイルを読み込み</span>
              </StatusItem>
              <StatusItem active={isReady}>
                <div className="dot" />
                <span>質問準備完了</span>
              </StatusItem>
            </StatusList>
          </Card>
        </Grid>
        <ChatArea>
          <ChatHistory>
            {!isReady && !file && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div style={{ textAlign: 'center', color: '#a3a3a3' }}>
                  <MessageCircle size={64} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                  <p style={{ fontSize: '1.1rem' }}>まずPDFファイルをアップロードしてください</p>
                </div>
              </div>
            )}
            {file && !isReady && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div style={{ textAlign: 'center', color: '#fb923c' }}>
                  <Loader2 size={64} />
                  <p style={{ fontSize: '1.1rem' }}>PDFファイルを処理中...</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <ChatBubble key={index} type={message.type}>
                <Bubble type={message.type}>{message.content}</Bubble>
              </ChatBubble>
            ))}
            {isSending && (
              <ChatBubble type="ai">
                <Bubble type="ai">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.95rem' }}>AIが考え中</span>
                    <Dots>
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </Dots>
                  </div>
                </Bubble>
              </ChatBubble>
            )}
          </ChatHistory>
          <ChatInputArea>
            <ChatInput
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isReady ? 'ご質問を入力してください...' : 'まずPDFファイルをアップロードしてください'}
              disabled={!isReady || isSending}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!isReady || !inputMessage.trim() || isSending}
            >
              {isSending ? (
                <Loader2 size={20} />
              ) : (
                <Send size={20} />
              )}
            </SendButton>
          </ChatInputArea>
        </ChatArea>
      </MainContainer>
    </div>
  );
};

export default PDFQAAssistant;
