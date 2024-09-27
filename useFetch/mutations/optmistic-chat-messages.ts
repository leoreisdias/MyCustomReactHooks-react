export const sendMessage = (message:string) => {
    const optmisticMessage = {
        message,
        id: Math.random().toString()
    };

    await mutate(
        async (mutation) => {
          const response = await sendMsgApi(message);
    
          if (!response.isSuccess) {
            alert("Não foi possível enviar a mensagem");
    
            return {
              message: "Não foi possível enviar a mensagem",
              payload: mutation?.payload || [],
            };
          }
    
          optmisticMessage.id = response.payload.id || optmisticMessage.id;
    
          const previousMessages = mutation?.payload || [];
    
          return {
            message: "Mensagem enviada",
            payload: [...previousMessages, optmisticMessage],
          };
        },
        {
          optimisticData: {
            message: "Enviando mensagem...",
            payload: [...(data?.payload || []), optmisticMessage], // 'data' is from useSWR
          },
          revalidate: false,
          populateCache: true,
          rollbackOnError: true,
        },
      );
}