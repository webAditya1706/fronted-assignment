import { ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface Props {
  name: string;
  label: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  preview: string| null;
  setPreview: (value:string|null)=>void;
  fileInputRef: any

}

const SelectFile = ({ label, name, setFieldValue, preview, setPreview, fileInputRef }: Props) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    if (file) {
      setFieldValue(name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);

      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue(name, null);
      setPreview(null);
    }
  };

  // useEffect(() => {
  //   if(preview && router.query.id){
  //     setFieldValue(name, preview);
  //   }

  // },[preview,router.query])

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>      
      <input type="file" className="form-control" onChange={handleChange} ref={fileInputRef} />
      {preview && <img src={preview} alt="Preview" className="img-preview mt-2" />}
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
};

export default SelectFile;
