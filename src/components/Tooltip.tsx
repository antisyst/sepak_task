import React, { ReactNode } from 'react';

interface TooltipProps {
  id: string;
  place?: 'top' | 'right' | 'bottom' | 'left';
  effect?: 'float' | 'solid';
  children: ReactNode;
  content: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ id, place = 'top', effect = 'solid', children, content }) => {
  return (
    <div data-tip={content} data-for={id} data-place={place} data-effect={effect}>
      {children}
    </div>
  );
};

export default Tooltip;
