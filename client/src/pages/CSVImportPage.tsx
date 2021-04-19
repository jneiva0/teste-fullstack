import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Divider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { parse, ParseResult } from 'papaparse'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// Vou deixar os componentes usados aqui nesse arquivo para não misturar com os da
// atividade 1. No geral prefiro deixar um componente por arquivo e nomear o arquivo com o nome do componente

// Estou usando uma biblioteca para fazer o parse do arquivo, não sei se o objetivo era
// implementar do zero ou apenas ter a feature funcionando. Por motivos de tempo fui na alternativa mais rápida
// Vi alguns métodos para ler o CSV, se eu fosse implementar eu tentaria algo usando Regex
// Acho que para lidar com todos os casos possíveis a alternativa mais promissora seria usando State Machines

// Pela falta de tempo estou presumindo algumas coisas.
// Estou considerando que o CSV esteja estruturado com a primeira linha como cabeçalho
// a biblioteca também já está fazendo a conversão de números e boolean

// Está faltando lidar com o tipo Data

export const CSVImportPage = () => {
  const [result, setResult] = useState<ParseResult<unknown>>()

  const onUpload = (file: File) => {
    parse(file, {
      complete: res => {
        return setResult(res)
      },
      header: true,
      dynamicTyping: true,
    })
  }
  return (
    <Container maxW='container.lg' pt={16}>
      <FileUploadInput onUpload={onUpload} />
      <Divider my={3} />
      {result && <ResultTable result={result} />}
    </Container>
  )
}

// A Tabela funciona bem caso as linhas tenham o mesmo número de campos
// Linhas incompletas são ignoradas, está longe do ideal mas ao menos é mostrado
// quais linhas tiveram problema.
const ResultTable = ({ result }: { result: ParseResult<unknown> }) => {
  return (
    <>
      {result.errors.map(error => (
        <Alert key={error.row} status='error'>
          <AlertIcon />
          <AlertTitle mr={2}>Linha {error.row}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ))}
      <Table mt={8}>
        <Thead>
          <Tr>
            {result.meta.fields?.map(field => (
              <Th key={field}>{field}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {/* Estou usando o indice como key já que não consigo prever o formato dos dados */}
          {result.data.map((row, i) => (
            <Tr key={i}>
              {Object.values(row as Record<string, string | number>).map(
                (cell, i) => (
                  <Td key={i}>{cell}</Td>
                )
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

// Estou usando uma biblioteca chamada react-dropzone para carregar o arquivo por questão de praticidade
// Como é algo simples, em um projeto real essa função poderia ser implementada do zero
// para evitar uma dependencia a mais no projeto
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
