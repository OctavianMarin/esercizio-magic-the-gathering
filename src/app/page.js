"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import headerImage from "../images/header.png";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=100");
        const data = await response.json();
        setCards(data.cards); // Set the cards in state
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-2 flex flex-col">
      <Image
        src={headerImage}
        alt="Header Image"
        layout="responsive"
        width={1920}
        height={1080}
        className="object-cover m-2"
      />
      <Input
        placeholder="Type to search"
        className="m-2"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <div className="flex flex-wrap items-center -mr-4">
        { cards.map(card => card.imageUrl && (query === "" || card.name.toLowerCase().includes(query.toLowerCase())) && <>
          <Card className="w-[calc(25%-1rem)] h-72 mx-2 my-2 flex flex-col justify-between" key={card.name}>
            <CardHeader>
              <CardTitle className="text-base">{card.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex justify-center items-end">
              <Image
                src={card.imageUrl}
                width={120}
                height={100}
                alt={card.name}
              />
            </CardContent>
          </Card>
        </>)}
      </div>
    </div>
  );
}
