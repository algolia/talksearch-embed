import { h } from 'preact';

const SvgComponent = ({ color = '#3e396b', ...props }) => (
  <svg viewBox="0 0 193 186" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M168 93.9c-.2 23-1 33-6.6 40-1 1.7-2.8 2.5-4.3 3.5-5.4 4-30.7 5.4-60 5.6-29.3-.2-55.8-1.5-61-5.6-1.7-1-3.6-1.8-4.6-3.4-5.4-7.1-6.2-17.1-6.5-40.1.3-23 1-33 6.5-40 1-1.6 3-2.5 4.6-3.6 5.2-3.9 31.7-5.3 61-5.3s54.6 1.4 60 5.3c1.5 1.1 3.4 2 4.3 3.5 5.5 7.1 6.4 17.1 6.6 40zm-75.4-5.6c-1.5-17.8-11-28.3-28-28.3C49.3 60 37 74 37 96.4c0 22.5 11.1 36.6 29.5 36.6 14.6 0 24.9-10.8 26.5-28.7H75.5c-.7 6.6-3.5 11.8-9.3 11.8-9.3 0-11-9.2-11-19 0-13.3 3.9-20.1 10.3-20.1 5.7 0 9.3 4 9.8 11.3h17.3zm61 0c-1.5-17.8-11-28.3-28-28.3C110.3 60 98 74 98 96.4c0 22.5 11.1 36.6 29.5 36.6 14.6 0 24.9-10.8 26.5-28.7h-17.5c-.7 6.6-3.5 11.8-9.3 11.8-9.3 0-11-9.2-11-19 0-13.3 3.9-20.1 10.3-20.1 5.7 0 9.3 4 9.8 11.3h17.3z"
        fill={color}
      />
      <g stroke={color} strokeWidth={16} transform="translate(8 8)">
        <ellipse cx={88.5} cy={85} rx={88.5} ry={85} />
        <path d="M147 23L29 145" strokeLinecap="square" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;