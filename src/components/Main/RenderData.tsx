import type { ReactElement } from 'react';
import styles from './styles.module.css';

type controlledDataProps = {
  submittedData: MyFormData | null;
};
export function RenderData({
  submittedData,
}: controlledDataProps): ReactElement {
  if (!submittedData) {
    return <div>No data submitted yet</div>;
  }
  const hasData =
    submittedData.name !== '' ||
    submittedData.email !== '' ||
    submittedData.country !== '';
  if (!hasData) {
    return <div>No data submitted yet</div>;
  }
  return (
    <div className={styles.tile}>
      <div>
        <b>Name:</b> {submittedData.name}
      </div>
      <div>
        <b>Age:</b> {submittedData.age}
      </div>
      <div>
        <b>Email:</b> {submittedData.email}
      </div>
      <div>
        <b>Password:</b> {submittedData.password}
      </div>
      <div>
        <b>Gender:</b> {submittedData.gender}
      </div>
      <ul>
        <b>File:</b>
        <li>
          <b>Name:</b> {submittedData['upload file']?.fileName}
        </li>
        <li>
          <b>Type: </b>
          {submittedData['upload file']?.fileType}
        </li>
        <li>
          <b>Base64:</b> {submittedData['upload file']?.base64}
        </li>
      </ul>
      <div>
        <b>Country:</b> {submittedData.country}
      </div>
    </div>
  );
}

export type MyFormData = {
  name: string;
  age: string;
  email: string;
  password: string;
  'password confirmation': string;
  gender: string | null;
  country: string;
  'upload file': { base64: string; fileName: string; fileType: string } | null;
  'accept Terms and Conditions': boolean;
};
