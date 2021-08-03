// This script can be largely ignored. It is to generate users in the DB.

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const fetch = require('node-fetch')
let prisma = new PrismaClient()

const data = [
  {"id":"rec0JRah12k658lyX","fields":{"Username":"sampoder","Default Profile Picture":"https://github.com/sampoder.png"}},{"id":"rec0T24KlgHuN4W1i","fields":{}},{"id":"rec0b8DITBE7eXhE6","fields":{}},{"id":"rec13Y1oUbHH2YFma","fields":{}},{"id":"rec14KwnVgRPE2fl2","fields":{}},{"id":"rec1FUOgXgkkBh5tE","fields":{}},{"id":"rec1OuHvsW9nEXLGg","fields":{}},{"id":"rec1bKOD5XAlTzHZ8","fields":{}},{"id":"rec1cOT2Pl6MwEuzj","fields":{"Username":"arcade","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U01VDAQB99P-a494050f30d8-512"}},{"id":"rec2SqPcQf6YQbRlu","fields":{}},{"id":"rec2lO8eE5hYfZgQm","fields":{}},{"id":"rec2mIzJiJHVkK4rg","fields":{"Username":"risha","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U010W27CNN9-0de8ce62e8d8-512"}},{"id":"rec2uKplof6DMfhPt","fields":{"Username":"roshan","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UNGNM3H9A-d31a2d1b4dac-512"}},{"id":"rec2x8HVZ7SEhxTaE","fields":{}},{"id":"rec3TCQGSNVSPze4s","fields":{"Username":"byeongjun","Default Profile Picture":"https://pbs.twimg.com/profile_images/1355676650365546501/hm8CiJ7y_400x400.jpg"}},{"id":"rec3ikLtySzC7JS0r","fields":{}},{"id":"rec4PYq4wwokjHSyP","fields":{}},{"id":"rec4kbIBEgUAMKKEo","fields":{}},{"id":"rec4q3gHZAkooCC7d","fields":{}},{"id":"rec4t2UPWBr3rno6r","fields":{}},{"id":"rec5OOJ1fbxFD5sRj","fields":{}},{"id":"rec5P08HbDXK8bDwD","fields":{}},{"id":"rec5UEiCNKIp1HyLB","fields":{}},{"id":"rec5b4RKuzH2T8xO8","fields":{}},{"id":"rec5bb1jYNTyyWp9s","fields":{}},{"id":"rec5pPjckbReUx7to","fields":{}},{"id":"rec5w9WpozusrgkFO","fields":{}},{"id":"rec5wtULX24LDKhmt","fields":{"Username":"jason","Default Profile Picture":"https://avatars.githubusercontent.com/u/30608521?v=4"}},{"id":"rec6pneInjP3f6LKk","fields":{}},{"id":"rec6xmmVZBOnwriRS","fields":{}},{"id":"rec72bVyTONc3mxWW","fields":{}},{"id":"rec7Guoz3vTWzSSCw","fields":{}},{"id":"rec7NpN29gORGy9rx","fields":{}},{"id":"rec8eXee0eZoT1A5k","fields":{}},{"id":"rec99qGd2JuxDNuJt","fields":{}},{"id":"rec9LdUjJtK8mPcql","fields":{}},{"id":"rec9lE2odtSpn7DOR","fields":{"Username":"sarthak","Default Profile Picture":"https://avatars.githubusercontent.com/u/28282096?v=4"}},{"id":"rec9tOBpvdkfERJyw","fields":{}},{"id":"rec9tPF1KJCBe4NcY","fields":{}},{"id":"recA7iPh1glE9krVt","fields":{}},{"id":"recAuB6pOrqQZL7zZ","fields":{}},{"id":"recBTPQKZDcwxc5d3","fields":{}},{"id":"recC89yyNewF8JX5e","fields":{"Username":"ella","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U01D6FYHLUW-6e9ee046aec0-512"}},{"id":"recCsn6vowWP44Qlm","fields":{}},{"id":"recCyJE3AghEjGfgi","fields":{"Username":"lux","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U01G0Q9K998-4297ce9c58eb-512"}},{"id":"recDAe93YZclzKMPI","fields":{}},{"id":"recDBQtFyvZTJ6lau","fields":{}},{"id":"recDVP42asNfEiNMG","fields":{}},{"id":"recDdHvDmaVkoOtX5","fields":{"Username":"claire","Default Profile Picture":"https://avatars.githubusercontent.com/u/41759033?v=4"}},{"id":"recDre4qbFGRqomk1","fields":{}},{"id":"recE23tzkVycn9I5M","fields":{}},{"id":"recFdP6xZsevRqCV1","fields":{}},{"id":"recFlWsC2vpo5x8ZG","fields":{}},{"id":"recGQQJEIvEnFIpmA","fields":{}},{"id":"recGdRku5HXQop6x8","fields":{}},{"id":"recHnuGKyw4G27ydJ","fields":{}},{"id":"recHoSjnPc5lb0Mia","fields":{"Username":"lorenzo","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U012Z4YLWAH-aa6cdbeeb75b-512"}},{"id":"recHpAP9r0mcM0BZQ","fields":{}},{"id":"recHx6UjN5u95gxS8","fields":{}},{"id":"recI1RhijshEc5FPq","fields":{}},{"id":"recI9Lt3uPfS7O73Z","fields":{}},{"id":"recJ2V7T756fGtk5m","fields":{}},{"id":"recJFwXbbHvfElrMk","fields":{}},{"id":"recJsfSlxNJuluSeR","fields":{"Username":"abby","Default Profile Picture":"https://avatars.githubusercontent.com/u/46800781?v=4"}},{"id":"recK1wyXcA4OqZlIU","fields":{}},{"id":"recKSh60pQf89ALmk","fields":{}},{"id":"recL4KnlPhLIiSXeb","fields":{}},{"id":"recLjPGyjM6gCVXw2","fields":{}},{"id":"recLnFAD9SNlI7awP","fields":{}},{"id":"recMVBySzUO8NiW7Y","fields":{}},{"id":"recMr01CZ1IWpQh5l","fields":{}},{"id":"recMxPHkvFvw3HXIV","fields":{}},{"id":"recNRxjZS68TuRivI","fields":{"Username":"swarnya","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U0163SRQJQH-2e2c3def10f9-512"}},{"id":"recNfWEjA963wF7rl","fields":{}},{"id":"recOQWG8vyRPmm8ik","fields":{}},{"id":"recPECsmqvO6XBTt3","fields":{}},{"id":"recPbpsHc2m392bKi","fields":{}},{"id":"recPcLZDDHf6OT8QB","fields":{"Username":"linus","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U011CFN98K1-acd4f16647e6-512"}},{"id":"recPvJH6nLCk7QkY2","fields":{}},{"id":"recQJjvSkHCc6ROo2","fields":{}},{"id":"recS0rGv4koXO3sWz","fields":{}},{"id":"recS18m0zCsCnwNUz","fields":{}},{"id":"recSIvhqASwiX7EcV","fields":{}},{"id":"recSMaMDIjuEEKLvg","fields":{}},{"id":"recSkJgNx9nbH6CIn","fields":{}},{"id":"recSkpCDcRMX8ifda","fields":{"Username":"labdhi","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UM8RU5ALT-a0da9ba87f98-512"}},{"id":"recStGF8lORNH0NYc","fields":{}},{"id":"recTWZRSG5Lu4gniB","fields":{}},{"id":"recTbbcuPJS7W9lEc","fields":{}},{"id":"recTgubChDdLblxSL","fields":{}},{"id":"recU3D4qyfpBDiP6S","fields":{}},{"id":"recUT2wCxKjJ9G6eB","fields":{}},{"id":"recV0DKq3m6NzyYP9","fields":{}},{"id":"recV3DsbJJtw7KQum","fields":{}},{"id":"recVNTKuv0vhrQsDQ","fields":{}},{"id":"recVZYvzV5gJP12mQ","fields":{}},{"id":"recVdhbuYqexEosBI","fields":{}},{"id":"recViL6AE9ss7XUjb","fields":{}},{"id":"recVsxpUquwV7Vqc2","fields":{}},{"id":"recVvjIkVJSnEQYQq","fields":{"Username":"pranav","Default Profile Picture":"https://avatars.githubusercontent.com/u/46251241?v=4"}},{"id":"recVvnk77m23B2AvH","fields":{}},{"id":"recXZcY0W50AC3zhc","fields":{}},{"id":"recY3s0RSqzQ97aA4","fields":{"Username":"professor-sucrose","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UKWAR6XFS-5a0b2b73549c-512"}},{"id":"recYkReYzRliARi0r","fields":{"Username":"belle","Default Profile Picture":"https://avatars.githubusercontent.com/u/65808924?v=4"}},{"id":"recYn4RhMcqo9WRce","fields":{"Username":"cwelsh","Default Profile Picture":"https://avatars.githubusercontent.com/u/20668045?v=4"}},{"id":"recYnOplbEyO6aEP0","fields":{}},{"id":"recYzrEBY2TenQU7V","fields":{"Username":"cole","Default Profile Picture":"https://avatars.githubusercontent.com/u/49500253?v=4"}},{"id":"recZQKjiYnrLPLFtQ","fields":{}},{"id":"recagsH9WabvGmMWP","fields":{}},{"id":"recalWE7KNEMANlsP","fields":{}},{"id":"recaw4LUcesaZEVfo","fields":{"Username":"lavi","Default Profile Picture":"https://avatars.githubusercontent.com/u/64455400?v=4"}},{"id":"recb98ru1QiIPEFZx","fields":{}},{"id":"recbzv8LVhw9j1O4h","fields":{}},{"id":"recc55q6W4a1RWI8Z","fields":{}},{"id":"reccA7RGvXC9ihVZU","fields":{}},{"id":"reccNgDn9WWEQUUvB","fields":{}},{"id":"recd1fzGomKp4qeX2","fields":{}},{"id":"recdST5FzEUGxCrL0","fields":{}},{"id":"recdc6VZiVjiDbAXA","fields":{}},{"id":"rece1uFExtcDazTeD","fields":{}},{"id":"receKP12dCrVlNxTF","fields":{}},{"id":"recekRG01ZyVUvB3S","fields":{}},{"id":"recep0c48YWZREIZ6","fields":{"Username":"maya","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-US3TNHG9W-5a07f4b81ac8-512"}},{"id":"recfaYhnUxn76rqPV","fields":{}},{"id":"recfjzM8M6v7xfDHT","fields":{}},{"id":"recfpTTYztppKeXm0","fields":{"Username":"damicake","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UKQ3MM5K3-53a5e3086dbe-512"}},{"id":"rechEAiu5oAJIZh7S","fields":{}},{"id":"rechmhIitQ0QiZEze","fields":{"Username":"benjamin-a","Default Profile Picture":"https://avatars.githubusercontent.com/u/32651204?v=4"}},{"id":"reciOnkEabpRzLuNU","fields":{}},{"id":"reciRSAhYKYHBqnm5","fields":{}},{"id":"reciTacWyTQCGCeb7","fields":{}},{"id":"reciaKRoDhHykRGsC","fields":{"Username":"hugo","Default Profile Picture":"https://pbs.twimg.com/profile_images/1338153554679304192/WVTyHXZt_400x400.jpg"}},{"id":"reciqYOPJ3wExPZi8","fields":{}},{"id":"recjEtwsc5rKi02oY","fields":{}},{"id":"recjI0113KGBrheMv","fields":{}},{"id":"recjLF0PZxjyjrTdT","fields":{"Username":"robert","Default Profile Picture":"https://avatars.githubusercontent.com/u/68445266?v=4"}},{"id":"recjQsIY5lHvuUiKi","fields":{}},{"id":"recjbWciT3BYxjm8t","fields":{}},{"id":"reck2Y16vXO9MykF2","fields":{}},{"id":"reck3gLysjJ6AvOkc","fields":{}},{"id":"reckG357E2gT4vIfL","fields":{}},{"id":"reckKqGO0gVoH6WL4","fields":{}},{"id":"reckdoYOunrRIv5SF","fields":{"Username":"aiden","Default Profile Picture":"https://avatars.githubusercontent.com/u/38025074?v=4"}},{"id":"reckltNQs3AlwY0ci","fields":{}},{"id":"recl68CzTc3kZqRnd","fields":{"Username":"rebecca","Default Profile Picture":"https://avatars.githubusercontent.com/u/73043927?v=4"}},{"id":"reclOArevr1SIEayP","fields":{"Username":"kunal","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U013DC0KYC8-7966d1ecbc46-512"}},{"id":"reclStqr1RhRZkSJl","fields":{}},{"id":"reclfEQAFKVvC4lkP","fields":{"Username":"ishan","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U01ACA3M90C-0257b7a88bf0-512"}},{"id":"recm5QF8Ga22nEhcO","fields":{}},{"id":"recmHjzM2VmMhca4T","fields":{"Username":"yoda","Default Profile Picture":"https://avatars.githubusercontent.com/u/76178582?v=4"}},{"id":"recmKw63tN5IbEd5t","fields":{}},{"id":"recmlz47f2F39CoAG","fields":{"Username":"rishi","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UHFEGV147-eaee71f9e613-512"}},{"id":"recmqtYRtxUNApD2B","fields":{}},{"id":"recmzJ8eHA6yMtv5C","fields":{}},{"id":"recnX7IlZFAGUzFSE","fields":{}},{"id":"recnnYqVEmZo5GYzR","fields":{"Username":"merlin04","Default Profile Picture":"https://avatars.githubusercontent.com/u/11800751?v=4"}},{"id":"recnyivL7XKLbqCCG","fields":{"Username":"ani","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U01D9DWGEB0-d1288e2cdc2b-512"}},{"id":"recoTPNnzwM9rDQ3l","fields":{}},{"id":"recokfJ2Pd7SVEKDA","fields":{"Username":"kevin","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U015X5P6KAM-gc35567f1dbb-512"}},{"id":"recp3JSrQAuMThfxn","fields":{}},{"id":"recp5vv5KX5x4v6hU","fields":{}},{"id":"recp9rFAnIkFbIylj","fields":{"Username":"ben","Default Profile Picture":"https://avatars.githubusercontent.com/u/7585353?v=4"}},{"id":"recpSEQAL8cRP1AuR","fields":{}},{"id":"recpjZDHtpKuBpRkc","fields":{}},{"id":"recr2utaLsLmf66Rg","fields":{}},{"id":"recrEVbsCB13A82iS","fields":{}},{"id":"recruj8KGH4CdQtDi","fields":{}},{"id":"recrukjFmTIyKiqeT","fields":{}},{"id":"recs8wKJFeZsx3iLP","fields":{}},{"id":"recsGQQKofZJozZmG","fields":{"Username":"gleich","Default Profile Picture":"https://avatars.githubusercontent.com/u/43759105?v=4"}},{"id":"rectCzCokOJzGdXTw","fields":{}},{"id":"rectWxMjuQD210o9N","fields":{}},{"id":"rectqim0YAkKcqRPR","fields":{}},{"id":"rectzZcEQDrgBxNWB","fields":{}},{"id":"recu2fZqeexP7Wpdu","fields":{"Username":"arianna","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-U012U7V5W22-832a38fc2d22-512"}},{"id":"recuF03QtwqWa3FxN","fields":{}},{"id":"recuKpEIvUaL4MouY","fields":{}},{"id":"recvGQtkiKrcZHGLe","fields":{"Username":"neel","Default Profile Picture":"https://avatars.githubusercontent.com/u/35831013?v=4"}},{"id":"recvThft9z88WAdCV","fields":{}},{"id":"recveHSbLBR9dY1OU","fields":{}},{"id":"recw9mBssRSCN8SDP","fields":{}},{"id":"recwFce76v6zaVD33","fields":{}},{"id":"recwxIYgkcaLgRNvb","fields":{}},{"id":"recx76XRqRAdLpiqL","fields":{}},{"id":"recxFVh8herDjoIij","fields":{}},{"id":"recxkKZums6AoH2EM","fields":{}},{"id":"recxpYis3hIr8mUYR","fields":{"Username":"kognise","Default Profile Picture":"https://avatars.githubusercontent.com/u/42556441?v=4"}},{"id":"recy5az0xkZdetrsO","fields":{"Username":"will","Default Profile Picture":"https://avatars.githubusercontent.com/u/53620720?v=4"}},{"id":"recymmHOp08cUIyvd","fields":{}},{"id":"reczGsmDxM3fXg7CV","fields":{}},{"id":"reczXVeFdIdu4Vyt7","fields":{"Username":"charelle","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UMN9S43FE-5c95fc33609b-512"}},{"id":"reczaCpjfymJrC6sY","fields":{"Username":"jp","Default Profile Picture":"https://ca.slack-edge.com/T0266FRGM-UN1PMGUN8-ed7bd1c10dd7-512"}}, {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'zrl',
      'Default Profile Picture':
        'https://avatars.githubusercontent.com/u/992248?v=4'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'msw',
      'Default Profile Picture':
        'https://avatars.githubusercontent.com/u/5891442?v=4'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'zfogg',
      'Default Profile Picture':
        'https://avatars.githubusercontent.com/u/774794?v=4'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'matthew',
      'Default Profile Picture':
        'https://avatars.githubusercontent.com/u/14811170?v=4'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'woody',
      'Default Profile Picture':
        'https://www.woodykeppel.com/images/xcu.jpg'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'leo',
      'Default Profile Picture':
        'https://ca.slack-edge.com/T0266FRGM-U022FMN61SB-e99ec674b6d4-512'
    }
  },
  {
    id: 'rec1cOT2Pl6MwEuzj',
    fields: {
      Username: 'mojombo',
      'Default Profile Picture':
        'https://avatars.githubusercontent.com/u/1?v=4'
    }
  }
]

const data2 = [
	{
		id: "ams",
		fields: {
			Username: "ams",
			'Default Profile Picture': 'https://google.com'
		}
	}
]

async function main(human) {
  if (typeof human.fields['Default Profile Picture'] == 'undefined') {
    return
  }
//  const response = await fetch(human.fields['Default Profile Picture'])
//  const buffer = await response.buffer()
  if (!fs.existsSync(`./public/users`)) {
    fs.mkdirSync(`./public/users`)
  }
  if (!fs.existsSync(`./public/users/${human.fields['Username']}`)) {
    fs.mkdirSync(`./public/users/${human.fields['Username']}`)
  }
  //fs.writeFile(`./public/users/${human.fields['Username']}/avatar.png`, buffer, () =>
    //console.log('finished downloading!')
 // )
  fs.writeFile(
    `./public/users/${human.fields['Username']}/styles.css`,
    '/* Write your custom CSS here! */',
    () => console.log('finished downloading!')
  )
  let created = await prisma.user.create({
    data: {
      name: human.fields['Username'],
      cssURL: `/users/${human.fields['Username']}/styles.css`,
      profilePicture: `/users/${human.fields['Username']}/avatar.png`
    }
  })
  return created
}

data2.forEach(human => main(human))
