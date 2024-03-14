import { Navbar } from "@nextui-org/react";
import TablaRevision from "../components/revision/tablaRevision";
import FooterDysam from "../components/utilities/FooterDysam";

function Revision() {
  return (
    <div>
      <Navbar />
      <TablaRevision />
      <FooterDysam />
    </div>
  );
}

export default Revision;
