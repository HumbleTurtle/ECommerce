import {createContext, ReactNode, useState} from 'react';
import ConfirmationDialog from 'features/common/ConfirmationDialog';
import {nanoid} from '@reduxjs/toolkit';
import InfoDialog from 'features/common/InfoDialog';
import ModalDialog from 'features/common/ModalDialog';
import React from 'react';

export const DialogContext = createContext<DialogContextInterface>({
  confirmDialog: ()=> {},
  infoDialog: ()=>{},
  modalDialog: ()=>{}
});

export interface DialogContextInterface {
  confirmDialog: Function,
  infoDialog: Function,
  modalDialog: Function
}

type Popup = {
  id: string,
  content: React.ReactNode
}

export const DialogContextProvider = ( {children} : {children:ReactNode} ) => {
  const [elements, setElements] = useState<Array<Popup>>([]);

  const confirmDialog = ({onAccept=()=>{}, text, title} : {onAccept: Function, text:ReactNode, title:ReactNode}) => {
    const id = nanoid();
    
    const contentNode = <ConfirmationDialog
      open={true}
      key={id}
      title={title}
      text={text}
      onAccept={() => {
        onAccept();
      }}
      onClose={()=>{
        closeDialog(element);
      }}
    ></ConfirmationDialog>;

    const element ={
      id,
      content: contentNode 
    }

    setElements([...elements, element]);
  };

  const infoDialog = ({onAccept=()=>{}, text, title} : {onAccept: Function, text:ReactNode, title:ReactNode}) => {
    const id = nanoid();

    const contentNode = <InfoDialog
      open={true}
      key={id}
      title={title}
      text={text}
      onAccept={() => {
        onAccept();
      }}
      onClose={()=>{
        closeDialog(element);
      }}
    ></InfoDialog>;

    const element ={
      id,
      content: contentNode 
    }

    setElements([...elements, element]);
  };

  const modalDialog = ({onAccept=()=>{}, content, title} : {onAccept: Function, content:ReactNode, title:ReactNode}) => {
    const id = nanoid();
    const contentNode = <ModalDialog
      open={true}
      key={id}
      title={title}
      content={content}
      onAccept={() => {
        onAccept();
      }}
      onClose={()=>{
        closeDialog(element);
      }}
    ></ModalDialog>;

    const element ={
      id,
      content: contentNode 
    }

    setElements([...elements, element]);
    return () => {
      closeDialog(element);
    }
  };

  const closeDialog = (popup : Popup) => {
    const index = elements.findIndex((el)=> popup.id === el.id );
    setElements( elements.splice(index, 1));
  };

  console.log('RENDER');

  const value : DialogContextInterface = {confirmDialog, infoDialog, modalDialog}


  return <DialogContext.Provider value={value}>

      {children}
      {elements.map(el=> el.content )}

  </DialogContext.Provider>;
};

