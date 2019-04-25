import React from 'react';
import { OwmServiceConsumer } from '../../services';

export default WrappedComponent => {
  const withOwmService = ({ ...props }) => {
    return (
      <OwmServiceConsumer>
        {owmService => {
          return <WrappedComponent {...props} owmService={owmService} />;
        }}
      </OwmServiceConsumer>
    );
  };

  return withOwmService;
};
