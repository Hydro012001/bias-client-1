import { useState, ChangeEvent, useRef, useEffect } from "react";
import "../Screens/CSS/pitch.css";
import Address from "./address";

import { bussinessTypes, bussinessesName } from "../Components/bussinesDetails";
import { storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./loader";
import { decryptId } from "./Encryptor";
export default function Pitch({ handleShowPitchBusiness }) {
  const { id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const bussilistType = bussinessTypes();
  const [bussinessnameList, setbussinessnameList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //Bussiness Logo
  const [bussinessPhoto, setBussinessPhoto] = useState("");

  const [bussinessPhotoMayor, setbussinessPhotoMayor] = useState("");

  const [bussinessPhotoBIR, setbussinessPhotoBIR] = useState("");

  const [bussinessPhotoBrgy, setbussinessPhotoBrgy] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  useState("");
  const fileInputRef = useRef(null);
  const [bussineName, setBussinessName] = useState("");
  const [bussiness, setBussiness] = useState("");
  const [bussinesType, setBussinesType] = useState("");
  const [bussinessCapital, setBussinessCapital] = useState("");
  const [bussinessDetails, setBussinessDetails] = useState("");

  const [filesUpload, setFilesUpload] = useState([]);
  const setBussinessNameList = (code) => {
    setbussinessnameList(bussinessesName(code));
  };
  const [imagesURL, setImagesURL] = useState([]);
  // const uploadBussinessPhoto = async () => {
  //   const strg = storage;
  //   const imgRef = ref(strg, "files/" + bussinessPhoto.name);

  //   uploadBytes(imgRef, bussinessPhoto)
  //     .then((snap) => {
  //       getDownloadURL(snap.ref).then((url) => {
  //         uploadDB(url);
  //       });
  //     })
  //     .catch((error) => alert(error));
  // };

  //   // alert("You click me");
  //   // console.log(address.barangay);
  //   try {
  //     await uploadBussinessPhoto(bussinessPhotoFilename, bussinessPhoto)
  //       .then((res) => (bussinessPhotoURL = res))
  //       .catch((error) => console.log(error));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoMayorFilename,
  //     //   bussinessPhotoMayor
  //     // ).then((res) => (bussinessPhotoMayorURL = res));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoBIRFilename,
  //     //   bussinessPhotoBIR
  //     // ).then((res) => (bussinessPhotoBIRURL = res));

  //     // await uploadBussinessPhoto(
  //     //   bussinessPhotoBrgyFilename,
  //     //   bussinessPhotoBrgy
  //     // ).then((res) => (bussinessPhotoBrgyURL = res));
  //     // setBussinessPhotoRUL(url);
  //     // if (fileInputRef.current) {
  //     //   fileInputRef.current.value = "";
  //     // }

  //     // displayProp();
  //     //uplaodDB();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   console.log(bussinessPhotoURL);
  // }, [bussinessPhotoURL]);

  // const displayData = (url) => {
  //   console.log(url);
  // };
  const handleSetFiles = (uploadType, event) => {
    const index = filesUpload.findIndex((item) => item.fileType === uploadType);
    // console.log(index);
    if (index !== -1) {
      const updateFilesUpload = [...filesUpload];
      updateFilesUpload[index] = {
        fileType: uploadType,
        fileSelected: event,
      };
      setFilesUpload(updateFilesUpload);
    } else {
      setFilesUpload([
        ...filesUpload,
        { fileType: uploadType, fileSelected: event },
      ]);
    }
  };

  const HandleUploadFile = async () => {
    setShowLoader(true);
    let downloadURL = [];

    for (let i = 0; i < filesUpload.length; i++) {
      const fileType = filesUpload[i].fileType;
      const fileName = filesUpload[i].fileSelected.name;

      console.log(fileName);
      const storageRef = ref(storage, `${user_id}/${fileName}`);

      try {
        const snapshot = await uploadBytes(
          storageRef,
          filesUpload[i].fileSelected
        );
        const url = await getDownloadURL(snapshot.ref);

        downloadURL.push({ fileType, link: url });
      } catch (error) {
        console.error("Error uploading or getting download URL:", error);
      }
    }
    console.log(downloadURL);
    uploadDB(downloadURL);
  };

  // const setImages = (id, images) => {
  //   const findImageId = uploadImages.findIndex((index) => index.id === id);

  //   console.log(findImageId);
  //   if (findImageId !== -1) {
  //     setUploadImages((prev) => {
  //       const updatedImages = [...prev];
  //       updatedImages[findImageId] = { id: id, filename: images };
  //       return updatedImages;
  //     });
  //   } else {
  //     setUploadImages((prev) => [...prev, { id: id, filename: images }]);
  //   }
  // };
  // useEffect(() => {
  //   uploadImages.map((e) => console.log(e.filename));
  // }, [uploadImages]);

  // const checkImages = () => {
  //   let process = 0;
  //   while (process < uploadImages.length) {
  //     //console.log(uploadImages[process].filename.name);

  //     try {
  //       const strg = storage;
  //       const imgRef = ref(
  //         strg,
  //         "files/" + uploadImages[process].filename.name
  //       );

  //       uploadBytes(imgRef, uploadImages[process].filename)
  //         .then((snap) => {
  //           getDownloadURL(snap.ref).then((url) => {
  //             console.log(url);
  //             setImagesURL((prev) => [...prev, { url: url }]);
  //             process++;
  //           });
  //         })
  //         .catch((error) => console.log(error));
  //     } catch (error) {
  //       console.log(error);
  //       process++;
  //     }
  //   }

  //   // uploadImages.map((e, index) => {
  //   //   const strg = storage;
  //   //   const imgRef = ref(strg, "files/" + e.filename.name);

  //   //   uploadBytes(imgRef, e.filename)
  //   //     .then((snap) => {
  //   //       getDownloadURL(snap.ref).then((url) => {
  //   //         console.log(url);
  //   //         setImagesURL((prev) => [...prev, { url: url }]);
  //   //       });
  //   //     })
  //   //     .catch((error) => console.log(error));
  //   // });
  // };

  const checkImages = async () => {
    for (const e of uploadImages) {
      try {
        const strg = storage;
        const imgRef = ref(strg, "files/" + e.filename.name);

        const snap = await uploadBytes(imgRef, e.filename);
        const url = await getDownloadURL(snap.ref);
        //console.log(e.id);
        if (e.id === "1") {
          setbussinessPhotoMayor(url);
          console.log("1");
        } else if (e.id === "2") {
          setbussinessPhotoBIR(url);
          console.log("2");
        } else if (e.id === "3") {
          setbussinessPhotoBrgy(url);
          console.log("3");
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Done");
    uploadDB();
  };

  const uploadDB = (url) => {
    // console.log(bussinessPhotoMayor);
    // console.log(bussinessPhotoBIR);
    // console.log(bussinessPhotoBrgy);
    // console.log("Upload Database");
    // console.log(url);
    let BusinessPhoto = "";
    let MayorPermit = "";
    let BIR = "";
    let BRGYClearance = "";

    try {
      for (let i = 0; i < url.length; i++) {
        if (url[i].fileType === "BusinessPhoto") {
          BusinessPhoto = url[i].link;
        } else if (url[i].fileType === "MayorPermit") {
          MayorPermit = url[i].link;
        } else if (url[i].fileType === "BIR") {
          BIR = url[i].link;
        } else if (url[i].fileType === "BRGYClearance") {
          BRGYClearance = url[i].link;
        }
      }
    } catch (error) {}
    // console.log(BusinessPhoto);
    // console.log(MayorPermit);
    // console.log(BIR);
    // console.log(BRGYClearance);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/pitchbussines`, {
        bussinessName: bussineName,
        bussinesType: bussinesType,
        bussinessCapital: bussinessCapital,
        bussinessPhotoURL: BusinessPhoto,
        bussinessDetails: bussinessDetails,
        MayorPermit: MayorPermit,
        BIR: BIR,
        BRGYClearance: BRGYClearance,
        user_id: user_id,
        bussiness: bussiness,
        city: address.city,
        province: address.province,
        barangay: address.barangay,
      })
      .then((res) => {
        if (res.data.sucess) {
          setShowLoader(false);
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const navigateBack = () => {
    handleShowPitchBusiness();
  };
  return (
    <>
      {showLoader ? (
        <div className="load-com">
          <Loader />
        </div>
      ) : (
        <div className="pitch-container">
          <div className="box-pitch">
            <span className="icon" onClick={() => navigateBack()}>
              <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
            </span>

            <label>Business Name</label>
            <br />
            <input
              type="text"
              placeholder="eg. John Sari-sari store"
              onChange={(e) => setBussinessName(e.target.value)}
            />
            <br />
            <label>Selelct the Business Type</label>
            <br />
            <select
              onChange={(e) => {
                setBussinessNameList(e.target.value);
                setBussinesType(e.target.options[e.target.selectedIndex].text);
              }}
            >
              <option>Select Bussines Type</option>
              {bussilistType.map((item) => (
                <option key={item.id} value={item.bussine_type_code}>
                  {item.bussiness_type}
                </option>
              ))}
            </select>
            <br />
            <label>Select the Business</label>
            <br />
            <select onChange={(e) => setBussiness(e.target.value)}>
              <option>Select Bussines :</option>
              {bussinessnameList.map((item) => (
                <option key={item.id} value={item.bussiness_name}>
                  {item.bussiness_name}
                </option>
              ))}
            </select>
            <br />
            <label>Select Business Address</label>
            <br />
            <Address addressData={setAddress} />
            <br />
            <label>Business Capital</label>
            <br />
            <input
              type="number"
              min={0}
              max={50000}
              placeholder="e.g 10000"
              onChange={(e) => setBussinessCapital(e.target.value)}
            />
            <br />
            <label>Provide a description of your business: </label>
            <br />

            <textarea
              id="textarea"
              spellCheck={true}
              onChange={(e) => setBussinessDetails(e.target.value)}
            />

            <br />
            <label>Attach Bussines Picture/Logo</label>
            <br />
            <input
              type="file"
              onChange={(e) =>
                handleSetFiles("BusinessPhoto", e.target.files[0])
              }
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg"
            />
            <br />
            <br />
            <h1>Business Credentials</h1>
            <label>
              Attach Mayor's Permit{" "}
              <label style={{ color: "green" }}>optional</label>
            </label>
            <br />
            <input
              type="file"
              onChange={(e) => handleSetFiles("MayorPermit", e.target.files[0])}
              accept="application/pdf"
            />
            <br />
            <label>Attach BIR Registration </label>
            <br />
            <input
              type="file"
              onChange={(e) => handleSetFiles("BIR", e.target.files[0])}
              accept="application/pdf"
            />
            <br />
            <label>Attach Barangay Clearance </label>
            <br />
            <input
              type="file"
              onChange={(e) =>
                handleSetFiles("BRGYClearance", e.target.files[0])
              }
              accept="application/pdf"
            />
            <br />
            <button onClick={() => HandleUploadFile()}>Pitch</button>
          </div>
        </div>
      )}
    </>
  );
}
