import React from 'react';
import {Container, Row, Col, Card} from '../../src/Grid'
import styles from './ExampleGrid.scss'

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';

function renderStandardInput() {
  return (
    <TextField>
      <Label
        for="textField"
      >
        Text Field
      </Label>
      <Input
        id="textField"
        placeholder="Default text goes"
      />
    </TextField>
  );
}

export default () =>
  <div data-hook="card-example" className={styles.exampleContainer}>
    <Container>
      <Row>
        <Col span={8}>
          <Card withoutDivider subtitle="subtitle" title="Header without Divider">
            <Row>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
              <Col span={3}>
                {renderStandardInput()}
              </Col>
              <Col span={3}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Side Card">
            <Row>
              <Col span={12}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Card title="Main card" subtitle="Subtitle">
            <Row>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Card title="Card Header">
            <Row>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Card header">
            <Row>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
              <Col span={4}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <Card link={{link: 'http://www.wix.com/', title: 'Link to Wix'}}>
            <Row>
              <Col span={12}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card header" link={{link: 'http://www.wix.com/', title: 'Link to Wix'}}>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Card header" subtitle="Card subtitle" link={{link: 'http://www.wix.com/', title: 'Link to Wix'}}>
            <Row>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
              <Col span={6}>
                {renderStandardInput()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>;
