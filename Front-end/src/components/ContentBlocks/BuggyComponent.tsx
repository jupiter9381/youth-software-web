// BuggyComponent.tsx
import React from 'react';

const BuggyComponent: React.FC = () => {
  throw new Error('This is a test error!');
  return <div>This will never be displayed</div>;
};

export default BuggyComponent;
