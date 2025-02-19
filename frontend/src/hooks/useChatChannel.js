// src/hooks/useChatChannel.js
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOrCreateChannel, fetchMessages, sendMessage } from "../services/ChatService";

export const useChatChannel = (recipientId) => {
  const [channel, setChannel] = useState(null);

  const channelMutation = useMutation({
    mutationFn: () => fetchOrCreateChannel(recipientId),
    onSuccess: (data) => {
      setChannel(data);
    },
  });

  useEffect(() => {
    if (recipientId) {
      channelMutation.mutate();
    }
  }, [recipientId]);

  const {
    data: messages,
    refetch: refetchMessages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", channel?._id],
    queryFn: () => fetchMessages(channel._id),
    enabled: !!channel,
    refetchInterval: 5000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ channelId, content }) => sendMessage({ channelId, content }),
    onSuccess: () => {
      refetchMessages();
    },
  });

  const handleSendMessage = async (content) => {
    if (channel && content.trim() !== "") {
      await sendMessageMutation.mutateAsync({ channelId: channel._id, content });
    }
  };

  return {
    channel,
    messages,
    messagesLoading,
    messagesError,
    sendMessage: handleSendMessage,
    refetchMessages,
    channelLoading: channelMutation.isLoading,
    channelError: channelMutation.error,
  };
};
