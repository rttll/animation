'use client';

import { useRive } from '@rive-app/react-canvas';

export default function RivePage() {
  const { RiveComponent } = useRive({
    src: '/test.riv',
    autoplay: true,
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}