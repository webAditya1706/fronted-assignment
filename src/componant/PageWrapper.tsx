// componant/PageWrapper.tsx or .jsx
import React, { ReactNode } from 'react';
import { Container, Row } from 'react-bootstrap';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <section>
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </section>
  );
}

export default PageWrapper;
