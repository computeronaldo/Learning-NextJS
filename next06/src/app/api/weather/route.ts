import { NextResponse } from "next/server";

const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = process.env.WEATHER_API_KEY;

export const GET = async (request: Request) => {
  const res = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=bulk`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const weatherData = await res.json();
  return NextResponse.json(weatherData);
};
