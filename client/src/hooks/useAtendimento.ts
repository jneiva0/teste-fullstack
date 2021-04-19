import useSWR from 'swr'
import {
  apiFinishAtendimento,
  apiGetAtendimento,
  apiStartAtendimento,
} from '../lib/api/atendimento'
import dayjs from 'dayjs'

export const useAtendimento = (id: string) => {
  // TODO: lidar com status de loading ou erro
  const { data, mutate, error } = useSWR([`atendimento/${id}`, id], (_, id) =>
    apiGetAtendimento(id)
  )

  const atendimento = data?.data

  //TODO: lidar com o caso de não existir um id valido. Ex: entrar na rota com um id não numerico
  //      Ex: /atendente/atendimento/abc

  // mutate é uma função que revalida a query, se chamada sem argumentos ela faz a query novamente
  // se passado uma promise ela atualiza os dados com o resultado da promise.
  // Como a chamada na API retorna o atendimento no sucesso, esse retorno é aproveitado para evitar uma chamada adicional na API
  const startAtendimento = async () => mutate(apiStartAtendimento(parseInt(id)))

  const finishAtendimento = async () =>
    mutate(apiFinishAtendimento(parseInt(id)))

  // Atualmente a duraçao não atualiza a não ser que algo force o rerender do componente
  // ou a pagina seja atualizada, acredito que a maneira ideal seria usar uma ref para atualizar o elemento diretamente
  // mas existem alguns truques que tambem resolveriam, como um setInterval atualizando a duraçao através do hook useState

  const duracaoAtual =
    atendimento?.startTime &&
    dayjs(new Date()).diff(atendimento.startTime, 'minutes')

  const duracaoTotal =
    atendimento?.finishTime && atendimento.startTime
      ? dayjs(atendimento.finishTime).diff(atendimento.startTime, 'minutes')
      : duracaoAtual

  return {
    atendimento,
    startAtendimento,
    finishAtendimento,
    error,
    duracaoTotal,
  }
}
