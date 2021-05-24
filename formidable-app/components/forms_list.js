import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './forms_list.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faQrcode } from "@fortawesome/free-solid-svg-icons";

const fetcher = url => axios.get(url).then(res => res.data);

export default function FormsList({ published }) {

  const router = useRouter();
  const { data, error, mutate } = useSWR( 'http://localhost:3000/api/get_all_forms', fetcher );
  
  const updatePublish = (id) => {

    axios.put('../api/update_published', {
      formId: id
    })
    .then(() => {mutate()})
    .catch(err => console.log(err));
  }

  const deleteForm = (id) => {

    axios.delete('../api/delete_form', {
      data: { formId: id }
    })
    .then(() => {mutate()})
    .catch(err => console.log(err));
  }

 
  if (error) {
    return (
      <div>
        Failed to load the form...
      </div>
    )
  } else if (!data) {
    return(
      <div className={styles.loader}></div>
    )
  } else {
    return(
      data.map((form) => {
        if (form.published === published) {
          return(
            <div key={form._id} className={styles.formRow}>
              <Link href={`/responses?form=${form._id}`}>
                <a>{form.name}</a>
              </Link>
              <div>
                {form.published ? (
                  <>
                    <button onClick={() => {router.push(`/publish?form=${form._id}`)}}>
                      <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => {updatePublish(form._id)}}>Unpublish</button>
                  </>
                ) : (
                  <>
                    <button disabled>
                      <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => {updatePublish(form._id)}}>Publish</button>
                  </>
                )}
                <button onClick={() => {deleteForm(form._id)}}>
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }


}