import { Box, Container, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export const CSVImportPage = () => {
  const onUpload = (file: File) => {
    console.log(file)
  }
  return (
    <Container pt={16}>
      <FileUploadInput onUpload={onUpload} />
    </Container>
  )
}

// Vou deixar os componentes usados aqui nesse arquivo para não misturar com os da
// atividade 1. No geral prefiro deixar um componente por arquivo e nomear o arquivo com o nome do componente

const FileUploadInput = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles.pop()
        if (file) onUpload(file)
      }
    },
    [onUpload]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: '.csv',
  })

  return (
    <Box
      borderWidth={1}
      px={2}
      py={5}
      w='full'
      bg='ButtonFace'
      _hover={{ bg: 'ButtonHighlight' }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <Text textAlign='center'>Solte o arquivo aqui...</Text>
      ) : (
        <Text textAlign='center'>Solte um arquivo ou clique para escolher</Text>
      )}
    </Box>
  )
}
