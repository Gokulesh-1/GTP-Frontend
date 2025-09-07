import React from "react";
import { useNavigate } from "react-router-dom";
// import grtdigi from "../images/grt digi.png";
// import lalithadigital from "../images/lalitha digital gold.png";
// import givadigi from "../images/giva digigold.png";
// import tanishq from "../images/tanishq.png";
// import joycoin from "../images/joy coin.png";
// import malabarbullion from "../images/malabar bullion.png";

const vendorDigitalGold = [
  {
    username: "Suresh",
    tokenID: 11,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeih5yx2tzytkzkkd5o7df3d7atfcguiy4b3hlf7m2dkhwd4nc7u3uy",
    description: "8g, 24K digital gold with 999 purity.",
    productDescription:
      "Secure your wealth with GRT’s Digital Gold, backed by 24K 999 purity gold. Purchase, sell, or store digitally without physical handling. A modern investment option with the security of traditional gold. Transparent and hassle-free transactions.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreibhhpvtjollfu224yhbvqo2mpogu55mt3tmh7sus7y3w4khgwil64",
    weight: "8g equivalent",
    price: "₹83,345",
  },
  {
    username: "Balaji",
    tokenID: 2,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeicl4gbwex2pszstcsyxdzxe44z2vp2fkz4xz22x5e6clurjwt3w34",
    description: "8g, 22K digital gold with 999 purity.",
    productDescription:
      "Invest in 22K Digital Gold from Lalitha Jewellers, ensuring purity and transparency. Digital gold allows you to trade seamlessly without physical storage worries. A convenient and modern approach to secure wealth. Easily redeemable as coins or bars.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreid64twlzsd3ucmmfnc4f3dfytrrjp2wgxnoozch73hgzfdih7mpza",
    weight: "8g equivalent",
    price: "₹83345",
  },
  {
    username: "Babu",
    tokenID: 3,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeierdsqqz77kgkc2idb3upp6m4huvpdep27bu5kaexi4qorzubvmgi",
    description: "8g, 14K digital gold with 999 purity.",
    productDescription:
      "Experience smart investing with Giva’s 14K Digital Gold. Buy and hold securely without storage hassles. Digital gold ensures flexibility in transactions with guaranteed purity. A perfect blend of modern investment and timeless value.",
    metal: "Gold",
    purity: "999 (14K)",
    metadataCID: "bafkreigbliqhrz754hxjaqayds3wl3soebsxa2g7wldrfgpfpselgtympe",
    weight: "8g equivalent",
    price: "₹83345",
  },
];

const vendorCoinBullion = [
  {
    username: "Ramesh",
    tokenID: 1,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1000",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeiaeie7ftiebjjxfoelhblwn2d6da3ig3pdzo7kxusiyrgzd7gpzrq",
    description: "8g, 24K digital gold with 999 purity.",
     productDescription:
      "A premium 24K gold coin crafted with 999 purity, perfect for investment and gifting. Tanishq ensures hallmark certification for every coin. Its elegant design symbolizes tradition and trust. A timeless asset to secure your future.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreidwdfa5naoust5c3nxox3l2yozmsmlavme5nwnb64nt6p6nzp2fru",
    weight: "8g",
    price: "₹83,345",
  },
  {
    username: "Chandru",
    tokenID: 5,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1003",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeibzjxdcfrvxfxkam6o2pugz23j7y3fifwo5pfli3cnfxt2d2ont3m",
    description: "8g, 22K digital gold with 999 purity.",
    productDescription:
      "A finely minted 22K gold coin with 999 fine purity, ideal for festive occasions and investments. Backed by Joyalukas assurance, this coin blends traditional elegance with financial value. A thoughtful gift that grows in worth over time.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreibpaxpo2qta3trchz2iamhvmyxuzhuu6uvlomm3edumast2xknjpm",
    weight: "8g",
    price: "₹83345",
  },
  {
    username: "Raju",
    tokenID: 6,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1005",
    type: "Gold Bullion",
    image: "https://ipfs.io/ipfs/bafybeibhxjm5guns5m3xcbko5dm2hxwyotworgpj5lwbucd3b7eyrjxzw4",
    description: "8g, 14K digital gold with 999 purity.",
     productDescription:
      "A massive 5kg bullion bar crafted with 22K fine gold and 999 purity. Perfect for serious investors looking for wealth preservation and growth. Malabar’s hallmark guarantees trust and authenticity. A true symbol of strength and security.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreihvnxfd637sadhkeo5k35uhjbnja5v2uh2bfe4c24plnvm62ru5j4",
    weight: "5kg",
    price: "₹5,51,96,570",
  },
];

const peerDigitalGold = [
  {
    username: "Harish",
    tokenID: 7,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeih5yx2tzytkzkkd5o7df3d7atfcguiy4b3hlf7m2dkhwd4nc7u3uy",
    description: "8g, 24K digital gold with 999 purity.",
    productDescription:
      "Secure your wealth with GRT’s Digital Gold, backed by 24K 999 purity gold. Purchase, sell, or store digitally without physical handling. A modern investment option with the security of traditional gold. Transparent and hassle-free transactions.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreibhhpvtjollfu224yhbvqo2mpogu55mt3tmh7sus7y3w4khgwil64",
    weight: "8g equivalent",
    price: "₹83,345",
  },
  {
    username: "Prasath",
    tokenID: 8,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeicl4gbwex2pszstcsyxdzxe44z2vp2fkz4xz22x5e6clurjwt3w34",
    description: "8g, 22K digital gold with 999 purity.",
    productDescription:
      "Invest in 22K Digital Gold from Lalitha Jewellers, ensuring purity and transparency. Digital gold allows you to trade seamlessly without physical storage worries. A convenient and modern approach to secure wealth. Easily redeemable as coins or bars.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreid64twlzsd3ucmmfnc4f3dfytrrjp2wgxnoozch73hgzfdih7mpza",
    weight: "8g equivalent",
    price: "₹83345",
  },
  {
    username: "Varshan",
    tokenID: 9,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    type: "Digital Gold",
    image: "https://ipfs.io/ipfs/bafybeierdsqqz77kgkc2idb3upp6m4huvpdep27bu5kaexi4qorzubvmgi",
    description: "8g, 14K digital gold with 999 purity.",
    productDescription:
      "Experience smart investing with Giva’s 14K Digital Gold. Buy and hold securely without storage hassles. Digital gold ensures flexibility in transactions with guaranteed purity. A perfect blend of modern investment and timeless value.",
    metal: "Gold",
    purity: "999 (14K)",
    metadataCID: "bafkreigbliqhrz754hxjaqayds3wl3soebsxa2g7wldrfgpfpselgtympe",
    weight: "8g equivalent",
    price: "₹83345",
  },
];

const peerCoinBullion = [
{
    username: "Gokulesh",
    tokenID: 10,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1000",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeiaeie7ftiebjjxfoelhblwn2d6da3ig3pdzo7kxusiyrgzd7gpzrq",
    description: "8g, 24K digital gold with 999 purity.",
     productDescription:
      "A premium 24K gold coin crafted with 999 purity, perfect for investment and gifting. Tanishq ensures hallmark certification for every coin. Its elegant design symbolizes tradition and trust. A timeless asset to secure your future.",
    metal: "Gold",
    purity: "999 (24K)",
    metadataCID: "bafkreidwdfa5naoust5c3nxox3l2yozmsmlavme5nwnb64nt6p6nzp2fru",
    weight: "8g",
    price: "₹83,345",
  },
  {
    username: "Shiva",
    tokenID: 4,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1003",
    type: "Gold Coin",
    image: "https://ipfs.io/ipfs/bafybeibzjxdcfrvxfxkam6o2pugz23j7y3fifwo5pfli3cnfxt2d2ont3m",
    description: "8g, 22K digital gold with 999 purity.",
    productDescription:
      "A finely minted 22K gold coin with 999 fine purity, ideal for festive occasions and investments. Backed by Joyalukas assurance, this coin blends traditional elegance with financial value. A thoughtful gift that grows in worth over time.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreibpaxpo2qta3trchz2iamhvmyxuzhuu6uvlomm3edumast2xknjpm",
    weight: "8g",
    price: "₹83345",
  },
  {
    username: "Raghavan",
    tokenID: 12,
    seller:"0x6869D6d5D9f41Fcda3A7A5B0Cd96d764AeaCfc47",
    serial: "1005",
    type: "Gold Bullion",
    image: "https://ipfs.io/ipfs/bafybeibhxjm5guns5m3xcbko5dm2hxwyotworgpj5lwbucd3b7eyrjxzw4",
    description: "8g, 14K digital gold with 999 purity.",
     productDescription:
      "A massive 5kg bullion bar crafted with 22K fine gold and 999 purity. Perfect for serious investors looking for wealth preservation and growth. Malabar’s hallmark guarantees trust and authenticity. A true symbol of strength and security.",
    metal: "Gold",
    purity: "999 (22K)",
    metadataCID: "bafkreihvnxfd637sadhkeo5k35uhjbnja5v2uh2bfe4c24plnvm62ru5j4",
    weight: "5kg",
    price: "₹5,51,96,570",
  },
];

function Card({ vendor, idx, section }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center h-80 justify-center">
      <div className="w-full text-center mb-2 font-bold text-lg">{vendor.username}</div>
      <div className="w-full text-center mb-2 text-yellow-700 font-semibold">{vendor.type}</div>
      <img src={vendor.image} alt={vendor.username} className="w-40 h-40 object-cover mb-2" />
      <div className="text-center text-gray-600 mb-2">{vendor.description}</div>
      <button
        className="bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600"
        onClick={() => navigate(`/p2p-details/${idx}`, { state: { vendor, section } })}
      >
        View Details
      </button>
    </div>
  );
}

function CardRow({ title, items, bgClass, section }) {
  return (
    <div className={`mb-8 rounded-xl p-6 ${bgClass} w-full`}>
      <div className="font-bold text-lg mb-4">{title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card key={idx} vendor={item} idx={idx} section={section} />
        ))}
      </div>
    </div>
  );
}

export default function P2PMarketplace() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <CardRow
          title="Selling to Vendor - Digital Gold"
          items={vendorDigitalGold}
          bgClass="bg-yellow-50"
          section="vendorDigitalGold"
        />
        <CardRow
          title="Selling to Vendor - Gold Coin & Bullion"
          items={vendorCoinBullion}
          bgClass="bg-yellow-100"
          section="vendorCoinBullion"
        />
        <CardRow
          title="Selling to Peer - Digital Gold"
          items={peerDigitalGold}
          bgClass="bg-gray-100"
          section="peerDigitalGold"
        />
        <CardRow
          title="Selling to Peer - Gold Coin & Bullion"
          items={peerCoinBullion}
          bgClass="bg-gray-200"
          section="peerCoinBullion"
        />
      </div>
    </div>
  );
}

export {
  vendorDigitalGold,
  vendorCoinBullion,
  peerDigitalGold,
  peerCoinBullion
};
