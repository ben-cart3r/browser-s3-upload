import React from 'react';
import ReactDOM from 'react-dom';
import S3UploadForm from './components/s3-upload-form';

const Root = () => (
    <S3UploadForm/>
)

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);