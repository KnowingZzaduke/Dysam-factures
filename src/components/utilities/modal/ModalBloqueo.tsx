import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
type Props = {
  showModalSendValues: boolean;
  setShowModalSendValues: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ModalBloqueo({
  showModalSendValues,
  setShowModalSendValues,
}: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    if (showModalSendValues === true) {
      onOpen();
      setTimeout(() => {
        setShowModalSendValues(false);
        onClose();
      }, 3000);
    }
  }, [showModalSendValues]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">EXITO!</ModalHeader>
            <ModalBody>
              <p>Los valores fueron enviados correctamente</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} color="warning">
                Cerrar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
