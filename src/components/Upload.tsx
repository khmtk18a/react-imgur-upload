import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { push } from '../features/localStorageSlice';
import { useDispatch } from 'react-redux';

const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadForm = () => {
  const dispatch = useDispatch()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: fileList,
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange(info) {
      setFileList(info.fileList)
    },
    async customRequest(options) {
      const { onSuccess, onProgress, onError } = options
      const base64Content = (await getBase64(options.file as RcFile)).split(',')[1];
      try {
        const result = await axios.postForm('https://api.imgur.com/3/image', {
          image: base64Content
        }, {
          onUploadProgress({ total, loaded }) {
            onProgress?.({ percent: Math.round((loaded / (total ?? 1)) * 100) })
          },
          headers: {
            Accept: 'application/json',
            Authorization: 'Client-ID f247949abb8308c'
          }
        });

        const json = result.data as ImgurResponse

        dispatch(push(json.data.link))

        onSuccess?.(result.data, result.request)
        message.success('Upload successfully')
      } catch (e) {
        const error = e as AxiosError
        onError?.(error, error.response?.data)
        message.error(error.message)
      }

      setFileList([])
    }
  };

  return (
    <Dragger {...draggerProps} style={{ width: '80%' }}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single.
      </p>
    </Dragger>
  )
};

export default UploadForm;
