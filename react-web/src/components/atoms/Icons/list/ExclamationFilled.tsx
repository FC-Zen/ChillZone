import { colors } from '@theme';
import { ReactElement } from 'react';
import { SVGProps } from './SVGProps';

const ExclamationFilled = ({
  color = colors.red,
  height = 24,
  width = 24,
}: SVGProps): ReactElement => {
  return (
    <svg width={width} height={height} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group">
        <path id="Vector" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0.0095625 24.8326 7.16737 31.9904 16 32ZM14.6667 8C14.6667 7.26363 15.2636 6.66669 16 6.66669C16.7364 6.66669 17.3333 7.26363 17.3333 8V18.6667C17.3333 19.4031 16.7364 20 16 20C15.2636 20 14.6667 19.4031 14.6667 18.6667V8V8ZM16 24C16.7364 24 17.3333 24.5969 17.3333 25.3333C17.3333 26.0697 16.7364 26.6666 16 26.6666C15.2636 26.6666 14.6667 26.0697 14.6667 25.3333C14.6667 24.5969 15.2636 24 16 24Z" fill={color}/>
      </g>
    </svg>
  );
};

export default ExclamationFilled;
