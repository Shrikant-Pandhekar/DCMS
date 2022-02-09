import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AppointmentBar from "../../components/AppointmentBar/AppointmentBar";
import TreatmentService from "../../components/TreatmentServices/TreatmentService";
import TreatmentShort from "../../components/TreatmentShort/TreatmentShort";
import { treatment } from "../../assets/data/treatment";

function TreatmentServiceFormat({ props }) {
  // const { treatments } = props.match.params;
  // console.log(treatments);
  let params = useParams();
  // const [data, setData] = useState({});
  // setData();
  // console.log(params);

  const filterdIdData = treatment.filter(
    (t) => t.tnameId === params.treatments
  );
  // console.log(filterdIdData);

  if (treatment.find((t) => t.tnameId === params.treatments)) {
    return (
      <>
        <Navbar />
        <TreatmentService data={filterdIdData[0]} id={params.treatments} />
        <AppointmentBar />
        <TreatmentShort data={filterdIdData[0]} id={params.treatments} />
        <Footer />
      </>
    );
  } else return <h1>HEllo</h1>;
}

export default TreatmentServiceFormat;
