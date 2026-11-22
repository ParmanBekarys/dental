const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ToothIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M7 3c-2.5 0-4 2-4 4.5 0 2 .8 3.4 1.3 5.5.6 2.6.9 8 2.7 8 1.6 0 1.7-4.5 3-6 .5-.6 1.5-.6 2 0 1.3 1.5 1.4 6 3 6 1.8 0 2.1-5.4 2.7-8 .5-2.1 1.3-3.5 1.3-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />
  </svg>
)

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)

export const CheckIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5 9-10" />
  </svg>
)

export const ClockIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

