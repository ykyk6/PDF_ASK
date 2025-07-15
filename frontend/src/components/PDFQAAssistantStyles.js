import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  100% { transform: rotate(360deg); }
`;

const blink = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

export const Dots = styled.span`
  display: inline-block;
  & span {
    display: inline-block;
    font-size: 1.5em;
    margin: 0 1px;
    opacity: 0.2;
    animation: ${blink} 1.4s infinite;
  }
  & span:nth-child(2) {
    animation-delay: 0.2s;
  }
  & span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const Bg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fff7ed 0%, #fff1f2 50%, #fce7f3 100%);
  opacity: 0.3;
  z-index: 0;
`;

export const MainContainer = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  z-index: 10;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  font-family: "Noto Sans JP", "Yu Gothic UI", "Meiryo", "Hiragino Sans",
    "MS PGothic", sans-serif;
`;

export const CenterIconArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
`;

export const IconBase = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 9999px;
  filter: blur(4px);
`;

export const IconBase1 = styled(IconBase)`
  bottom: -1rem;
  width: 8rem;
  height: 2rem;
  background: linear-gradient(to right, #fb923c, #f87171);
  opacity: 0.2;
`;

export const IconBase2 = styled(IconBase)`
  bottom: -0.5rem;
  width: 7rem;
  height: 1.5rem;
  background: linear-gradient(to right, #fdba74, #fca5a5);
  opacity: 0.4;
`;

export const IconBase3 = styled(IconBase)`
  bottom: 0;
  width: 6rem;
  height: 1rem;
  background: linear-gradient(to right, #fed7aa, #f9a8d4);
  opacity: 0.6;
`;

export const FolderIconArea = styled.div`
  position: relative;
  background: linear-gradient(135deg, #fb923c 0%, #f87171 50%, #f472b6 100%);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
`;

export const FolderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
`;

export const FolderContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const FolderIcon = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(4px);
`;

export const OrbitArea = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OrbitCircle = styled.div`
  width: 10rem;
  height: 10rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  position: relative;
`;

export const OrbitDot = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(to right, #fdba74, #fca5a5);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  left: 50%;
  top: 50%;
  transform: ${({ angle }) =>
    `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`};
  transform-origin: 50% 80px;
  .blur {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    filter: blur(4px);
  }
`;

export const StatusIndicator = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;

export const StatusCircle = styled.div`
  background: ${({ color }) => color};
  color: #fff;
  padding: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #ea580c, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

export const SubTitle = styled.p`
  color: #52525b;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.6)
  );
  backdrop-filter: blur(4px);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UploadArea = styled.div`
  border: 2px dashed #fdba74;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: #fb923c;
  }
`;

export const UploadText = styled.p`
  color: #fb923c;
`;

export const FileName = styled.p`
  color: #16a34a;
  font-weight: 500;
`;

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ active }) => (active ? "#16a34a" : "#a3a3a3")};
  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    background: ${({ active }) => (active ? "#4ade80" : "#d1d5db")};
  }
  span {
    font-size: 0.9rem;
  }
`;

export const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #52525b;
  font-size: 0.9rem;
`;

export const ChatArea = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.6)
  );
  backdrop-filter: blur(4px);
  border-radius: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

export const ChatHistory = styled.div`
  height: 24rem;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChatBubble = styled.div`
  display: flex;
  justify-content: ${({ type }) =>
    type === "user" ? "flex-end" : "flex-start"};
`;

export const Bubble = styled.div`
  max-width: 20rem;
  padding: 0.75rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.9rem;
  // white-space: pre-wrap;
  ${({ type }) =>
    type === "user"
      ? css`
          background: linear-gradient(to right, #fb923c, #f87171);
          color: #fff;
        `
      : type === "system"
      ? css`
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          color: #fff;
        `
      : css`
          background: rgba(255, 255, 255, 0.7);
          color: #1e293b;
          border: 1px solid #e5e7eb;
        `}
`;

export const ChatInputArea = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #fb923c;
    box-shadow: 0 0 0 2px #fdba74;
  }
`;

export const SendButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: linear-gradient(to right, #fb923c, #f87171);
  color: #fff;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(to right, #f59e42, #f43f5e);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const FullScreenLoader = styled.div`
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fb923c;
  flex-direction: column;
  pointer-events: all;
  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
