import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function fetchSmartphones() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/smartphones?limit=10&skip=0"
    ); // Removed the extra quotes

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    throw new Error(`Failed to fetch product categories: ${error.message}`);
  }
}

async function fetchLaptops() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/laptops?limit=20&skip=0"
    );

    const result = await response.json();

    return result.products;
  } catch (error) {
    throw new Error(error);
  }
}

function renderStars(rating, maxRating = 5) {
  // Ensure the rating is within the valid range
  rating = Math.max(0, Math.min(rating, maxRating));

  // Generate full stars
  const fullStars = "★".repeat(Math.floor(rating));
  // Generate empty stars
  const emptyStars = "☆".repeat(maxRating - Math.floor(rating));

  return fullStars + emptyStars;
}

export default async function Home({ searchParams }) {
  const selectedCategory = searchParams.category || "All Products";

  const smartphones = await fetchSmartphones();
  const laptops = await fetchLaptops();

  const renderProducts = () => {
    switch (selectedCategory) {
      case "Laptops":
        return (
          <div className="p-5 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {laptops.map((laptop) => (
              <Link key={laptop.id} href={`/${laptop.id}`}>
                <div className="p-5 border border-gray-300 rounded-lg my-10 space-y-5 flex flex-col justify-center items-center">
                  <Image
                    src={laptop.images[0]}
                    alt={laptop.title}
                    width={200}
                    height={200}
                  />
                  <p>{laptop.title}</p>
                  <p>${laptop.price}</p>
                  <p>{renderStars(laptop.rating)}</p>
                </div>
              </Link>
            ))}
          </div>
        );
      case "Smartphones":
        return (
          <div className="p-5 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {smartphones.map((phone) => (
              <Link key={phone.id} href={`/${phone.id}`}>
                <div className="p-5 border border-gray-300 rounded-lg my-10 space-y-5 flex flex-col justify-center items-center">
                  <Image
                    src={phone.images[0]}
                    alt={phone.title}
                    width={200}
                    height={200}
                  />
                  <p>{phone.title}</p>
                  <p>${phone.price}</p>
                  <p>{renderStars(phone.rating)}</p>
                </div>
              </Link>
            ))}
          </div>
        );
      case "All Products":
      default:
        return (
          <div className="p-5 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {laptops.map((laptop) => (
              <Link key={laptop.id} href={`/${laptop.id}`}>
                <div className="p-5 border border-gray-300 rounded-lg my-10 space-y-5 flex flex-col justify-center items-center">
                  <Image
                    src={laptop.images[0]}
                    alt={laptop.title}
                    width={200}
                    height={200}
                  />
                  <p>{laptop.title}</p>
                  <p>${laptop.price}</p>
                  <p>{renderStars(laptop.rating)}</p>
                </div>
              </Link>
            ))}
            {smartphones.map((phone) => (
              <Link key={phone.id} href={`/${phone.id}`}>
                <div className="p-5 border border-gray-300 rounded-lg my-10 space-y-5 flex flex-col justify-center items-center">
                  <Image
                    src={phone.images[0]}
                    alt={phone.title}
                    width={200}
                    height={200}
                  />
                  <p>{phone.title}</p>
                  <p>${phone.price}</p>
                  <p>{renderStars(phone.rating)}</p>
                </div>
              </Link>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-10">
      <Header />
      <div className="p-5 flex justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex outline p-1 outline-1 w-1/4 outline-black rounded-2xl flex-row justify-center items-center">
              <button className="font-semibold">Pick category</button>
              <MdOutlineKeyboardArrowDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="?category=All Products">All Products</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="?category=Laptops">Laptops</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="?category=Smartphones">Smartphones</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>{renderProducts()}</div>
    </div>
  );
}
