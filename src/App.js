import React from 'react';
import { Row, Col } from 'antd';
import Dropzone from './components/Dropzone';
import FileProvider from './contexts/FileContext';
import Watchbox from './components/Watchbox';
import TreeProvider from './contexts/TreeContext';
import FileList from './components/FileList';
import './App.css';


const App = () => {

  return (
    <FileProvider>
      <TreeProvider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={4}>
              <Watchbox />
            </Col>
            <Col className="gutter-row" span={20}>
              <Row>
                <Col className="gutter-row" span={24}><Dropzone /></Col>
              </Row>
              <Row>
                <Col className="gutter-row" span={24}>
                  <FileList />
                </Col>
              </Row>
            </Col>
          </Row>
      </TreeProvider>
    </FileProvider>
  );
}

export default App;
