import React, { useRef, useState } from 'react';
import './Form.css'; // Import the CSS file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';


const Form = () => {
     const [textInput, setTextInput] = useState('');
     const [fileInput, setFileInput] = useState(null);
     const [progress, setProgress] = useState(0)
     // const { createApplication, loading, setLoading, inputRef, iprogress, setIprogress, iprogressShow, setIprogressShow, applications, setApplications, applyinfo, setApplyinfo } = useAppliedApplication();
     const { userId } = useSelector(state => state.auth)

     const [loading, setLoading] = useState(true)
     const inputRef = useRef(null);
     const [iprogress, setIprogress] = useState(0)
     const [iprogressShow, setIprogressShow] = useState(false)
     const [applyinfo, setApplyinfo] = useState({

          openingId: '',
          title: '',
          name: '',
          phone: Number,
          email: '',
          cv: '',
          cLeter: ''

     })










     const handleTextChange = (event) => {
          setTextInput(event.target.value);
     };

     const handleFileChange = (event) => {
          setFileInput(event.target.files[0]);
     };

     const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(false)
          setIprogressShow(true);
          const fileName = new Date().getTime() + "_" + applyinfo.cv.name;
          const storageRef = await ref(storage, `/TnC/${fileName}`)
          console.log('storageRef');
          const uploadTask = uploadBytesResumable(storageRef, applyinfo.cv);
          uploadTask.on('state_changed', (snapshot) => {
               const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               )
               setIprogress(uploaded)
          }, (error) => { console.log(error) },
               async () => await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(userId, 'Upload')
                    if (!userId) swal("Login please")
                    setApplyinfo((applyinfo) => ({ ...applyinfo, 'cv': downloadURL }))
                    const tncCollectionRef = collection(db, 'Tnc');
                    const fileData = {
                         fileName: applyinfo.cv.name,
                         downloadURL: downloadURL,
                         userId, 
                         // Add other file-related information as needed
                    };

                    try {
                         const docRef = await addDoc(tncCollectionRef, fileData);
                         console.log('File information added to Firestore:', docRef.id);
                    } catch (error) {
                         console.error('Error adding file information to Firestore:', error);
                    }

                    setProgress(100)
                    setLoading(true)
                    setIprogress(0)
                    setIprogressShow(false)
                    // window.location.reload()
               }),
          )
     }



     return (
          <div className="form-container">
               <form onSubmit={handleSubmit}>
                    <div className="field ">
                         <div className="lableDiv">
                              <label htmlFor="cv" className="label">Upload Your TnC : </label>
                         </div>
                         <div className="border w-100 p-1 d-flex  flex-column">
                              <div className="mx-2 d-flex align-items-center justify-content-start  ">

                                   <div className="sp">

                                        <input accept=".pdf , .docx" className={`w-100 p-1 d-none  `} name='cv'
                                             type='file'
                                             ref={inputRef}
                                             hidden
                                             onChange={(e) => setApplyinfo({ ...applyinfo, 'cv': e.currentTarget.files[0] })}
                                        />
                                        <button
                                             type="button"
                                             className={`btn mx-2`}
                                             onClick={() => inputRef.current.click()}>
                                             Click here to upload
                                        </button>
                                        <span>{applyinfo.cv.name}</span>
                                   </div>

                                   {iprogressShow && iprogress < 100 && (
                                        <div className={``}>
                                             <span>{iprogress}%</span>
                                        </div>
                                   )}

                                   {iprogress === 100 && (
                                        <div className={`w-25 h-25 mx-2`} style={{ width: '25px' }}>
                                             <span className="w-100 h-100">
                                                  <img src="/successCheck.gif " alt="" className="w-25" />
                                             </span>
                                        </div>
                                   )}
                              </div>

                         </div>
                         <span id="passwordHelpInline" className="form-text text-danger">
                              *Only .pdf/.docx files are allowed
                         </span>
                    </div>






                    {/* <h3>OR</h3>

                    <label>
                         Text Input:
                         <textarea
                              id="text"
                              value={textInput}
                              onChange={handleTextChange}
                              rows="6"
                              placeholder="Enter text here..."
                         ></textarea>
                    </label> */}

                    <button id="upload" type="submit">Submit</button>
               </form>
          </div>
     );
};

export default Form;
