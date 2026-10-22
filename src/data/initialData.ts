import { Post } from '../utils/blog';

export interface SiteMeta {
  title: string;
  authorName: string;
  authorSubtitle: string;
  bio: string;
  issueNo: string;
  location: string;
  readers: string;
  avatarUrl: string;
}

export const initialSiteMeta: SiteMeta = {
  title: 'Anthems of Heart',
  authorName: 'DivyaShree',
  authorSubtitle: 'Poems, fragments & observations by DivyaShree',
  bio: 'Notes on memory, the architecture of silence, and private truths written at 3 AM. A repository of published essays and unpolished drafts.',
  issueNo: 'Issue No. 42',
  location: 'Bangalore / Remote',
  readers: '8.4k Readers',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5tdISrKVKtddR3O-tL4Wz5srTtP4EQvqhRcK0lBLfW9TFsPdjPpvLsTQTUlXAvmyhaC-Pn9_m2WLSE-ooOwmYG8UfWv6QCxx6me_IBXtrtFMXkVSppREjUESHmCLLBHedToGvN9Jix8SJZReFy9sAevFy6FfhC4_0Rq2fnR535wC0ss34HU9G0rWPKVVHHVy0rBIpiae_IvMjfwaORBkpDoTqgOcxJARNVZEtsDBIh1kOsxXKN0Xt'
};

export const initialPosts: Post[] = [
  {
    id: 'card-essay-1',
    title: 'On the Art of Disappearing',
    type: 'Essay',
    readTime: '6 min read',
    date: 'Nov 14',
    synopsis: 'On stepping back from the digital rush and finding clarity in stillness. When the noise reaches peak resonance, voluntary absence becomes the only genuine form of articulation left.',
    isRestricted: false,
    published: true,
    draftNumber: '#42-A',
    body: `
# On the Art of Disappearing

> "When the noise reaches peak resonance, voluntary absence becomes the only genuine form of articulation left."

There is an art to withdrawing without fanfare. Most exits in the modern world are performative—an announced departure designed to solicit pleas for return. We declare our digital sabbaticals on the very platforms we claim to abandon, waiting in the wings to measure the velocity of our absence.

Real vanishing has no prologue. It happens between breaths. It is the sudden decision to let the notification bell ring into the void without checking whose ghost is knocking. It is sitting in a sunlit chair at 4 PM and realizing that the world does not collapse because you stopped feeding it updates on your existence.

The culture demands presence as proof of devotion. If you are not broadcasting, you are presumed dead, irremediably obsolete, or quietly plotting a catastrophe. Yet history's deepest insights rarely emerged from a chorus; they crystallized in monastic cellars, during long walks through mist-laden conifers, and across desks uncluttered by the expectations of an invisible audience.

To disappear is not to surrender. It is an act of fierce preservation. It is reclaiming the unrendered pixels of your day—the thoughts you will never tweet, the sorrows you will never convert into essays, and the private joy of watching evening settle over the rooftops without taking a photograph to prove it happened.
`
  },
  {
    id: 'card-essay-2',
    title: 'Blue Light & Timestamps',
    type: 'Essay',
    readTime: '8 min read',
    date: 'Oct 29',
    synopsis: 'Late-night communications, sent receipts, and digital ghosts. The phantom reassurance of an active green dot across an ocean when everyone else has ceased speaking.',
    isRestricted: false,
    published: true,
    draftNumber: '#41-C',
    body: `
# Blue Light & Timestamps

> "The phantom reassurance of an active green dot across an ocean when everyone else has ceased speaking."

In the pale luminescence of 2:40 AM, the human mind operates under altered physics. Words typed into illuminated glass take on an intimacy that daylit conversation refuses to tolerate. We measure affection in milliseconds between 'sent' and 'delivered', translating the rhythmic pulsing of three typing dots into a modern form of divination.

We have built a civilization that communicates in digital residue. Old conversations remain preserved in eternal freeze-frames, their timestamps testifying to promises made under ceiling fans in cities we no longer visit. You can scroll through three years of correspondence in four seconds, witnessing the slow cooling of an entire emotional galaxy.

The green dot glows next to a name. In reality, it means nothing—a background process syncing, a phone left unlocked on a nightstand. But to the insomnia-haunted mind, it represents an tether: proof that somewhere in the planetary darkness, another soul is awake and staring at the same cold glow.

We live among ghosts of our own curation. Perhaps the kindest thing we can do for our past selves is to stop interrogating the timestamps and let the dead hours of the night be truly dark again.
`
  },
  {
    id: 'card-essay-3',
    title: 'For the ones who stayed in the dark (Archived Drafts)',
    type: 'Vault Draft',
    readTime: '12 min read',
    date: 'Oct 18',
    synopsis: 'An unredacted personal archive detailing private reflections, navigating public rumors, and the quiet dignity of starting over.',
    isRestricted: true,
    password: 'nocturne',
    draftNumber: 'Vault Draft #19',
    published: true,
    body: `
# For the ones who stayed in the dark (Archived Drafts)

*On surviving public whispers, preserving one's inner sanctuary, and moving forward with deliberate grace.*

There is a particular taxonomy to rumors. They do not arrive as thunder; they settle like dust over surfaces you believed were clean. For months, I treated silence as a deficiency, an omission that begged to be corrected. In modern discourse, if you do not step up to a podium within forty-eight hours, the court of public imagination constructs an effigy in your likeness and burns it for recreation.

It took waking up at three in the morning in a city that sleeps with its windows open to understand that not every accusation merits an audience. When you give oxygen to speculation, you validate the premise that your private life belongs to the commons. It does not.

> "Dignity is rarely loud. It is the steady refusal to let strangers furnish the rooms of your own interior life."

We live under a regime of compulsory transparency. We are encouraged to confess, to broadcast our wounds while they are still bleeding, to convert genuine grief into algorithmic currency. But there is a sacred architecture to silence. The things you refuse to say out loud remain yours alone. They cannot be monetized, they cannot be clipped into thirty-second soundbites, and they cannot be distorted by someone who already decided what you were before you spoke.

To start over is not to erase what happened. Starting over is simply sweeping the debris off the porch, shutting the door against the cold wind, and brewing tea for the people who actually sat with you in the dark without asking for a transcript.

To anyone currently enduring their own quiet season of misinterpretation: let them speak. The truth does not hurry. It survives under the weight of noise, waiting patiently for the wind to change.
`
  }
];
