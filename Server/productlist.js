/*
We store the data for the books on the website in the following file using a tabular structure as shown below.
Product Table :
1. Product ID
2. Product Name
3. Product Description
4. Genres
5. Stock Count
6. Price
7. Author
8. Publisher
9. Tags
10. Rating
11. Image Path
*/

var products = [
    {
      id:1 ,
      name:'Mistborn: The Final Empire',
      description:"The Final Empire, the first book in a trilogy by Brandon Sanderson, is a tale of a subjugated people known as the Skaa, and their fight for freedom against a seemingly invincible God known as the Lord Ruler. The Lord Ruler has ruled this world for a thousand years through his Inquisitors and Obligators.",
      genre:'Fantasy Fiction',
      stockcount: 100,
      price: 15,
      author:'Brandon Sanderson',
      publisher:'Tor Books',
      tags:'Fiction@Fantasy@Action@BestSeller@BookSeries@Paperback@English@YoungAdults',
      rating:4.5,
      imagepath:'assets/images/books/mistborn-finalempire.jpg'
    },
    {
      id:2 ,
      name:'Mistborn: The Well of Ascension',
      description:"The Final Empire is in turmoil as various regions descend into anarchy following the Lord Ruler's death and the disappearance of the Steel Ministry. Elend Venture has claimed the crown of the capital city, Luthadel, and attempts to restore order, but various hostile forces converge on the city.",
      genre:'Fantasy Fiction',
      stockcount: 75,
      price: 15,
      author:'Brandon Sanderson',
      publisher:'Tor Books',
      tags:'Fantasy@Fiction@Action@BestSeller@BookSeries@Paperback@English@YoungAdults',
      rating:4.7,
      imagepath:'assets/images/books/mistborn-wellascension.jpg'
    },
    {
      id:3 ,
      name:'Mistborn: The Hero of Ages',
      description:"Who is the Hero of Ages? To end the Final Empire and restore freedom, Vin killed the Lord Ruler. But as a result, the Deepness--the lethal form of the ubiquitous mists--is back, along with increasingly heavy ashfalls and ever more powerful earthquakes. Humanity appears to be doomed.",
      genre:'Fantasy Fiction',
      stockcount: 47,
      price: 15,
      author:'Brandon Sanderson',
      publisher:'Tor Books',
      tags:'Fantasy@Action@Fiction@BestSeller@BookSeries@Paperback@English@YoungAdults',
      rating:4.9,
      imagepath:'assets/images/books/mistborn-heroages.jpg'
    },
    {
      id:4 ,
      name:'Steelheart (The Reckoners)',
      description:"At age eight, David watched as his father was killed by an Epic, a human with superhuman powers. Now, 10 years later, he joins the Reckoners, people who are trying to kill the Epics and end their tyranny.",
      genre:'Action Adventure',
      stockcount: 152,
      price: 20,
      author:'Brandon Sanderson',
      publisher:'Delacorte Press',
      tags:'Fiction@Action@BestSeller@BookSeries@HardCover@English@Teens',
      rating:4.6,
      imagepath:'assets/images/books/steelheart.jpg'
    },
    {
      id:5 ,
      name:'FireFight (The Reckoners)',
      description:"The Reckoners' mission is to find and kill Regalia, the mysterious ruler who controls the flooded city via her water-based superpowers. Regalia also is in cahoots with Obliteration, the merciless Epic who burned down Houston and seems to want to do the same to Babilar.",
      genre:'Action Adventure',
      stockcount: 102,
      price: 20,
      author:'Brandon Sanderson',
      publisher:'Delacorte Press',
      tags:'Fiction@Action@BestSeller@BookSeries@HardCover@English@Teens',
      rating:4.3,
      imagepath:'assets/images/books/firefight.jpg'
    },
    {
      id:6 ,
      name:'Calamity (The Reckoners)',
      description:"After the events of Firefight, Abraham, Cody, Megan, and David are now all that's left of the Reckoners. The role of leader of the Reckoners has now fallen to David. Prof has been swallowed up by the darkness of his powers and has begun to take over a city and recruiting his own minion epics.",
      genre:'Action Adventure',
      stockcount: 112,
      price: 20,
      author:'Brandon Sanderson',
      publisher:'Delacorte Press',
      tags:'Fiction@Action@BestSeller@BookSeries@HardCover@English@Teens',
      rating:4.3,
      imagepath:'assets/images/books/calamity.jpg'
    },
    {
      id:7 ,
      name:'Rich Dad Poor Dad',
      description:"Rich Dad Poor Dad by Robert Kiyosaki and Sharon Lechter is a book that came out in 1997 and focuses on the importance of financial literacy from an early age. Throughout the book, the author explains how a person can increase their wealth by investing in assets and by being smart with money.",
      genre:'Personal Finance',
      stockcount: 65,
      price: 10,
      author:'Robert T. Kiyosaki',
      publisher:'Plata Publishing',
      tags:'Non-Fiction@Finance@BestSeller@Paperback@English@AllAges',
      rating:4.5,
      imagepath:'assets/images/books/richdadpoordad.jpg'
    },
    {
      id:8 ,
      name:'Think Like a Monk',
      description:"Combining ancient wisdom and his own rich experiences in the ashram, Think Like a Monk reveals how to overcome negative thoughts and habits, and access the calm and purpose that lie within all of us.",
      genre:'Self-Help',
      stockcount: 152,
      price: 1,
      author:'Jay Shetty',
      publisher:'Simon & Schuster',
      tags:'SelfHelp@Development@Spiritual@HardCover@English@AllAges',
      rating:4.3,
      imagepath:'assets/images/books/TLM.jpg'
    },
    {
      id:9 ,
      name:'The Four Agreements',
      description:"The Four Agreements draws on the long tradition of the Toltecs, an ancient, indigenous people of Mexico, to show you that we have been domesticated from childhood, how these internal, guiding rules hurt us and what we can do to break and replace them with a new set of agreements with ourselves.",
      genre:'Self-Help',
      stockcount: 200,
      price: 7,
      author:'Janet Mills',
      publisher:'Amber-Allen Publishing',
      tags:'SelfHelp@Development@Spiritual@BestSeller@HardCover@English@AllAges',
      rating:4.1,
      imagepath:'assets/images/books/T4A.jpg'
    },
    {
      id:10 ,
      name:'The Girl in the Leaves',
      description:"In the fall of 2010, in the all-American town of Apple Valley, Ohio, four people disappeared without a trace: Stephanie Sprang; her friend, Tina Maynard; and Tina's two children, thirteen-year-old Sarah and eleven-year-old Kody.",
      genre:'Crime',
      stockcount: 32,
      price: 10,
      author:'Robert Scott',
      publisher:'Berkley',
      tags:'Crime@Non-fiction@HardCover@English@Adults',
      rating:3.9,
      imagepath:'assets/images/books/TGIL.jpg'
    },
    {
      id:11 ,
      name:'The Sacrifice: A Dark Revenge Romance',
      description:"A Lord is to marry after he graduates from Barrington University, an elite college for the rich. A Lady's job is to help him fit into a world unaware of his secret society. The Lord does not get to choose who he spends the rest of his life with. But there is always an exception to the rule.",
      genre:'Romance',
      stockcount: 20,
      price: 25,
      author:'Shantel Tessier',
      publisher:'Shantel Tessier',
      tags:'Romance@Crime@Fiction@HardCover@English@Teens',
      rating:3.7,
      imagepath:'assets/images/books/Sacrifice.jpg'
    },
    {
      id:12 ,
      name:'The Shining',
      description:"Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
      genre:'Horror',
      stockcount: 26,
      price: 9,
      author:'Stephen King',
      publisher:'Anchor',
      tags:'Horror@BestSeller@Psychological@Fiction@Paperback@English@Adults',
      rating:4.9,
      imagepath:'assets/images/books/theshining.jpg'
    },
    {
      id:13 ,
      name:'Rita Hayworth and Shawshank Redemption',
      description:"A mesmerizing tale of unjust imprisonment and offbeat escape, Rita Hayworth and Shawshank Redemption is one of Stephen King's most beloved and iconic stories, and it helped make Castle Rock a place readers would return to over and over again. Suspenseful, mysterious, and heart-wrenching, this iconic King novella, populated by a cast of unforgettable characters, is about a fiercely compelling convict named Andy Dufresne who is seeking his ultimate revenge",
      genre:'Crime',
      stockcount: 123,
      price: 10,
      author:'Stephen King',
      publisher:'Scribner',
      tags:'Iconic@BestSeller@Fiction@HardCover@English@AllAges',
      rating:4.7,
      imagepath:'assets/images/books/Shawshank.jpg'
    },
    {
      id:14 ,
      name:'Gone Girl',
      description:"On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne's fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick's clever and beautiful wife disappears. Husband-of-the-Year Nick isn't doing himself any favors with cringe-worthy daydreams about the slope and shape of his wife's head, but passages from Amy's diary reveal the alpha-girl perfectionist could have put anyone dangerously on edge",
      genre:'Thriller',
      stockcount: 52,
      price: 15,
      author:'Gillian Flynn',
      publisher:'Gillian Flynn',
      tags:'Thriller@Fiction@BestSeller@Paperback@English@AllAges',
      rating:4.2,
      imagepath:'assets/images/books/GoneGirl.jpg'
    },
    {
      id:15 ,
      name:'One Hundred Years of Solitude',
      description:"One Hundred Years of Solitude tells the story of the rise and fall, birth and death of the mythical town of Macondo through the history of the Buendiá family. Inventive, amusing, magnetic, sad and alive with unforgettable men and women—brimming with truth, compassion, and a lyrical magic that strikes the soul—this novel is a masterpiece in the art of fiction.",
      genre:'Fantasy',
      stockcount: 36,
      price: 15,
      author:'Gabriel García Márquez',
      publisher:'Harper Perennial Modern Classics',
      tags:'Fantasy@NobelPrizeAuthor@Fiction@HardCover@Spanish@YoungAdults',
      rating:4.4,
      imagepath:'assets/images/books/100years.jpg'
    },
  ]

export default products

//When Items are purchased, For every item in the cart we update the corresponding product and its Stock count
export function updateproductlist(productinfo)
{
  if(productinfo.length == 0)
    return 0;
  var count = 0;
  productinfo.every(element => {
    var result = products.findIndex(a => a.id == element.id);
    if(result > -1 && element.quantity <= products[result].stockcount)
    {
      count++;
      products[result].stockcount = products[result].stockcount - element.quantity;
      return true;
    }
    else return false;
  });

  if(count == productinfo.length) return 1;
  else return 0;
}