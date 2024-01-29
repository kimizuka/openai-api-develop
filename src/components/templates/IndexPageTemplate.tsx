import axios from 'axios';
import styled from 'styled-components';
import { FormEvent, useCallback, useRef, useState } from 'react';

export function IndexPageTemplate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ base64, setBase64 ] = useState<string>('');
  const [ text, setText ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleClickBtnSubmit = useCallback(async () => {
    if (base64) {
      setIsLoading(true);
      const { data } = await axios.post('/api/openai', { base64 });

      setText(data.data.message.content);
      setIsLoading(false);
    }
  }, [base64]);

  function handleChangeInput(evt: FormEvent<HTMLInputElement>) {
    const file = evt.currentTarget.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');

          if (canvas && ctx) {
            canvas.width = Math.min(640, image.width);
            canvas.height = image.height * (canvas.width / image.width);

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            setBase64(canvas.toDataURL('image/jpeg'));
          }
        }

        image.src = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  return (
    <Wrapper data-is-loading={ isLoading }>
      <input onChange={ handleChangeInput } type="file" accept="image/*" capture="environment" />
      <canvas ref={ canvasRef } />
      <button onClick={ handleClickBtnSubmit }>submit</button>
      <p>{ text }</p>
      <div className="overlay">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.5" cx="12.5" cy="12" r="10" stroke="white" strokeWidth="4"/>
          <path d="M22.5 12C22.5 6.47715 18.0228 2 12.5 2" stroke="white" strokeWidth="4" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur=".8s"
              from="0 12 12"
              to="360 12 12"
            />
          </path>
        </svg>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;

  canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .overlay {
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    pointer-events: none;
  }

  svg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &[data-is-loading='true'] {
    pointer-events: none;

    .overlay {
      opacity: 1;
    }
  }
`;
