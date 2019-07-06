declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.ReactComponent<React.SVGProps<any>>;
  export default ReactComponent;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
