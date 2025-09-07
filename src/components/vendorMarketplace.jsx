import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../images/background.png";
// import tanishq from "../images/tanishq.png";
// import grtdigi from "../images/grt digi.png";
// import kalyanbullion from "../images/kalyan bullion.png";
// import malabarbullion from "../images/malabar bullion.png";
// import joycoin from "../images/joy coin.png";
// import lalithadigital from "../images/lalitha digital gold.png";
// import nathellacoin from "../images/nathella coin.png";
// import givadigi from "../images/giva digigold.png";
// import caratline from "../images/carat goldbullion.png";

export const vendors = [
   {
    vendorID: 1,
    serial: "1000",
    name: "TANISHQ JEWELLERS",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeiaeie7ftiebjjxfoelhblwn2d6da3ig3pdzo7kxusiyrgzd7gpzrq",
    description: "8g, 24K coin with 999 purity.",
    productDescription: "A premium 24K gold coin crafted with 999 purity, perfect for investment and gifting. Tanishq ensures hallmark certification for every coin. Its elegant design symbolizes tradition and trust. A timeless asset to secure your future.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreidwdfa5naoust5c3nxox3l2yozmsmlavme5nwnb64nt6p6nzp2fru",
    weight: "8g",
    price: "₹83,345"
  },
{
    vendorID: 2,
    serial: "1001",
    name: "GRT JEWELLERS",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeih5yx2tzytkzkkd5o7df3d7atfcguiy4b3hlf7m2dkhwd4nc7u3uy",
    description: "8g, 24K digital gold with 999 purity.",
    productDescription: "Secure your wealth with GRT’s Digital Gold, backed by 24K 999 purity gold. Purchase, sell, or store digitally without physical handling. A modern investment option with the security of traditional gold. Transparent and hassle-free transactions.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreibhhpvtjollfu224yhbvqo2mpogu55mt3tmh7sus7y3w4khgwil64",
    weight: "8g equivalent",
    price: "₹83,345"
  },
  {
    vendorID: 3,
    serial: "1002",
    name: "KALYAN JEWELLERS",
    type: "Gold Bullion",
    image: "https://ipfs.io/ipfs/bafybeicygh5nco53xzqvwiful5yu46mpvhdfioll2fml46tr3ww6oh5qvm",
    description: "1kg, 24K bar with 999 purity.",
    productDescription: "This 1kg gold bullion bar is an excellent choice for large-scale investors. Made of 24K gold with 999 purity, it represents trust and reliability. Kalyan Jewellers guarantees authenticity and quality. A perfect long-term wealth preservation asset.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreiealgrl2be4w2unglrsuqjlczdc3ergllebln6zx46v4yls4476jm",
    weight: "1kg",
    price: "₹1000"
  },
  {
    vendorID: 4,
    serial: "1003",
    name: "JOYALUKAS JEWELLERS",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeibzjxdcfrvxfxkam6o2pugz23j7y3fifwo5pfli3cnfxt2d2ont3m",
    description: "8g, 22K coin with 999 fine purity.",
    productDescription: "A finely minted 22K gold coin with 999 fine purity, ideal for festive occasions and investments. Backed by Joyalukas assurance, this coin blends traditional elegance with financial value. A thoughtful gift that grows in worth over time.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreibpaxpo2qta3trchz2iamhvmyxuzhuu6uvlomm3edumast2xknjpm",
    weight: "8g",
    price: "₹83345"
  },
  {
    vendorID: 5,
    serial: "1004",
    name: "LALITHA JEWELLERS",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeicl4gbwex2pszstcsyxdzxe44z2vp2fkz4xz22x5e6clurjwt3w34",
    description: "8g, 22K digital gold with 999 purity.",
    productDescription: "Invest in 22K Digital Gold from Lalitha Jewellers, ensuring purity and transparency. Digital gold allows you to trade seamlessly without physical storage worries. A convenient and modern approach to secure wealth. Easily redeemable as coins or bars.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreid64twlzsd3ucmmfnc4f3dfytrrjp2wgxnoozch73hgzfdih7mpza",
    weight: "8g equivalent",
    price: "₹83345"
  },
  {
    vendorID: 6,
    serial: "1005",
    name: "MALABAR GOLD & DIAMONDS",
    type: "Gold Bullion",
    image: "https://ipfs.io/ipfs/bafybeibhxjm5guns5m3xcbko5dm2hxwyotworgpj5lwbucd3b7eyrjxzw4",
    description: "5kg, 22K bullion with 999 fine gold.",
    productDescription: "A massive 5kg bullion bar crafted with 22K fine gold and 999 purity. Perfect for serious investors looking for wealth preservation and growth. Malabar’s hallmark guarantees trust and authenticity. A true symbol of strength and security.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreihvnxfd637sadhkeo5k35uhjbnja5v2uh2bfe4c24plnvm62ru5j4",
    weight: "5kg",
    price: "₹5,51,96,570"
  },
  {
    vendorID: 7,
    serial: "1006",
    name: "NATHELLA JEWELLERS",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeibb3ivgjj4o7bxzga7omdffk5fjgfd3w4aytf2l6vj46uymk54hyq",
    description: "8g, 14K coin with 999 purity.",
    productDescription: "This 14K gold coin of 8g weight provides affordability with authenticity. Designed with care, it balances purity with tradition. Suitable for gifting and light investments. A certified product ensuring value at a lower entry cost.",
    metal: "Gold",
    purity: "999 (14K)",
    metadataCID: "bafkreignpa4oz4cya6bxbul2r7vjauofrakq5m4kngsxgpyfnw32s5nela",
    weight: "8g",
    price: "₹83,345"
  },
  {
    vendorID: 8,
    serial: "1007",
    name: "GIVA JEWELLERS",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeierdsqqz77kgkc2idb3upp6m4huvpdep27bu5kaexi4qorzubvmgi",
    description: "8g, 14K digital gold with 999 purity.",
    productDescription: "Experience smart investing with Giva’s 14K Digital Gold. Buy and hold securely without storage hassles. Digital gold ensures flexibility in transactions with guaranteed purity. A perfect blend of modern investment and timeless value.",
    metal: "Gold",
    purity: "999 (14K)",
    metadataCID: "bafkreigbliqhrz754hxjaqayds3wl3soebsxa2g7wldrfgpfpselgtympe",
    weight: "8g equivalent",
    price: "₹83345"
  },
  {
    vendorID: 9,
    serial: "1008",
    name: "CARATLANE JEWELLERS",
    type: "Gold Bullion",
    image: "https://ipfs.io/ipfs/bafybeihhuepvrpzp5w4uxgikubw3ililrccbkkq6ruutwm4s73lljtw7vm",
    description: "4kg, 14K bullion bar with 999 purity.",
    productDescription: "A 4kg gold bullion bar with 14K quality, designed for affordable bulk investments. Backed by CaratLane’s trust, this bullion ensures transparency and security. Suitable for investors seeking value and diversification. A durable store of wealth.",
    metal: "Gold",
    purity: "999 (14K)",
    metadataCID: "bafkreiar74eymdtcz5yzxjqypkk7p2u4wz6qwe3qmnwqsao2vdduvyijna",
    weight: "4kg",
    price: "₹10000"
  },
];


function Card({ vendor, idx }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center h-96 justify-center">
      <div className="w-full text-center mb-2 font-bold text-lg">{vendor.username}</div>
      <div className="w-full text-center mb-2 text-yellow-700 font-semibold">{vendor.type}</div>
      <img src={vendor.image} alt={vendor.username} className="w-40 h-40 object-cover mb-2" />
      <div className="text-center text-gray-600 mb-2">{vendor.description}</div>
      <button
        className="bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600"
        onClick={() => navigate(`/vendor/${idx}`, { state: { vendor } })}
      >
        View More
      </button>
    </div>
  );
}

export default function VendorMarketplace() {
  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vendors.map((vendor, idx) => (
          <Card key={idx} vendor={vendor} idx={idx} />
        ))}
      </div>
    </div>
  );
}
// export default function VendorMarketplace() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {vendors.map((vendor, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
//           >
//             <div className="w-full text-center mb-2 font-bold text-lg">
//               {vendor.name}
//             </div>
//             <div className="w-full text-center mb-2 text-yellow-700 font-semibold">
//               {vendor.type}
//             </div>
//             <img
//               src={vendor.image}
//               alt={vendor.name}
//               className="w-40 h-40 object-cover rounded mb-3"
//             />
//             <div className="w-full text-center mb-4 text-gray-600">
//               {vendor.description}
//             </div>
//             <button className="bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600">
//               View More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }