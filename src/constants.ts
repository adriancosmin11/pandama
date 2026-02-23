import bestSellers1 from '@/src/assets/best-sellers1.png';
import bestSellers2 from '@/src/assets/best-sellers2.png';
import bestSellers3 from '@/src/assets/best-sellers3.png';
import bestSellers4 from '@/src/assets/best-sellers4.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'Legendary' | 'Rare' | 'Limited' | 'Standard';
  sku: string;
  specs: string[];
  color?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'void-shifter',
    name: 'VOID SHIFTER',
    price: 124.00,
    originalPrice: 159.00,
    description: 'Seria emblematică cu finisaj carbon mat și corzi din mătase violetă.',
    image: bestSellers1,
    category: 'Legendary',
    sku: 'PN-VDS-04',
    specs: ['Arțar Grad A', 'Vopsea Aderență', 'Tehnologie Anti-Deformare', 'Coardă cu Rulment']
  },
  {
    id: 'neon-katana',
    name: 'NEON KATANA',
    price: 89.00,
    description: 'Ediție limitată cu design cyberpunk și strălucire reactivă.',
    image: bestSellers2,
    category: 'Rare',
    sku: 'PN-NKT-02',
    specs: ['Strălucire Reactivă', 'Coardă Tensiune Înaltă', 'Echilibru de Precizie']
  },
  {
    id: 'chrome-bamboo',
    name: 'CHROME BAMBOO',
    price: 75.00,
    description: 'Sculptură minimalistă din lemn fuzionată cu performanță modernă.',
    image: bestSellers3,
    category: 'Standard',
    sku: 'PN-CBM-01',
    specs: ['Sursă Sustenabilă', 'Finisaj Natural', 'Ultraușor']
  },
  {
    id: 'spirit-blade',
    name: 'SPIRIT BLADE',
    price: 95.00,
    description: 'Serie ultraușoară pentru joc rapid și dinamic.',
    image: bestSellers4,
    category: 'Limited',
    sku: 'PN-SBT-03',
    specs: ['Ultraușor', 'Formă Aerodinamică']
  },
  {
    id: 'ghost-protocol',
    name: 'GHOST PROTOCOL',
    price: 145.00,
    originalPrice: 189.00,
    description: 'Seria stealth cu finisaj negru mat și rulment silențios.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc',
    category: 'Legendary',
    sku: 'PN-GHP-05',
    specs: ['Rulment Silențios', 'Negru Mat', 'Miez de Titan', 'Anti-Vibrație']
  },
  {
    id: 'sakura-drift',
    name: 'SAKURA DRIFT',
    price: 110.00,
    description: 'Serie limitată flori de cireș. Motive japoneze pictate manual pe arțar premium.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8',
    category: 'Limited',
    sku: 'PN-SKD-06',
    specs: ['Pictat Manual', 'Arțar Japonez', 'Ediție de Colecție']
  },
  {
    id: 'titanium-apex',
    name: 'TITANIUM APEX',
    price: 199.00,
    originalPrice: 249.00,
    description: 'Nivel competiție cu carcasă din titan aerospațial. Creat pentru câștigători.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z',
    category: 'Legendary',
    sku: 'PN-TXA-07',
    specs: ['Carcasă Titan', 'Nivel Competiție', 'Rulment Pro', 'Greutate Personalizată']
  },
  {
    id: 'pixel-storm',
    name: 'PIXEL STORM',
    price: 68.00,
    description: 'Artă pixel retro întâlnește inginerie modernă. Finisaj camuflaj digital.',
    image: '',
    category: 'Standard',
    sku: 'PN-PXS-08',
    specs: ['Camuflaj Digital', 'Rulment Standard', 'Ultraușor']
  }
];

export const QUICK_VIEW_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8';

// Pro Team data
export interface TeamMember {
  id: string;
  name: string;
  alias: string;
  role: string;
  image: string;
  stats: { label: string; value: string }[];
  achievements: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ryu-x',
    name: 'Kenji Tanaka',
    alias: 'RYU-X',
    role: 'Căpitan / Freestyle',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc',
    stats: [
      { label: 'Rang Mondial', value: '#3' },
      { label: 'Victorii', value: '247' },
      { label: 'Din', value: '2019' },
    ],
    achievements: ['Campion Mondial 2024', 'MVP Tur Asiatic', '10x Campion Lunar'],
  },
  {
    id: 'nova-blade',
    name: 'Elena Vasquez',
    alias: 'NOVA',
    role: 'Divizia Viteză',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8',
    stats: [
      { label: 'Rang Mondial', value: '#7' },
      { label: 'Victorii', value: '189' },
      { label: 'Din', value: '2020' },
    ],
    achievements: ['Deținător Record Viteză', 'Campion European 2025', 'Revelația Anului 2020'],
  },
  {
    id: 'phantom-z',
    name: 'Marcus Chen',
    alias: 'PHANTOM',
    role: 'Tehnic / Inovație',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z',
    stats: [
      { label: 'Rang Mondial', value: '#12' },
      { label: 'Victorii', value: '156' },
      { label: 'Din', value: '2021' },
    ],
    achievements: ['Premiu Inovație 2024', 'Seria Trick Master', 'Colaborare Designer Produs'],
  },
  {
    id: 'kira-s',
    name: 'Sakura Ito',
    alias: 'KIRA',
    role: 'Artistic / Performanță',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8',
    stats: [
      { label: 'Rang Mondial', value: '#5' },
      { label: 'Victorii', value: '210' },
      { label: 'Din', value: '2018' },
    ],
    achievements: ['Campion Mondial Artistic 2023', 'MVP Performanță 2024', 'Ambasador Brand'],
  },
];

// Drops data
export interface Drop {
  id: string;
  name: string;
  season: string;
  date: string;
  status: 'SOLD OUT' | 'LIVE' | 'UPCOMING';
  itemCount: number;
  description: string;
  image: string;
}

export const DROPS: Drop[] = [
  {
    id: 'drop-s05',
    name: 'VOID COLLECTION',
    season: 'Sezon 05',
    date: '2026-04-15',
    status: 'UPCOMING',
    itemCount: 6,
    description: 'Cea mai întunecată colecție de până acum. Inspirată din spațiul cosmic și absența luminii.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc',
  },
  {
    id: 'drop-s04',
    name: 'NEON STREETS',
    season: 'Sezon 04',
    date: '2026-01-20',
    status: 'LIVE',
    itemCount: 8,
    description: 'Fuzionând viața de noapte din Tokyo cu inginerie de înaltă performanță. Cantități limitate.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8',
  },
  {
    id: 'drop-s03',
    name: 'SAKURA SERIES',
    season: 'Sezon 03',
    date: '2025-09-10',
    status: 'SOLD OUT',
    itemCount: 5,
    description: 'Estetica flori de cireș întâlnește meșteșugul de precizie. Toate unitățile revendicate.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z',
  },
  {
    id: 'drop-s02',
    name: 'CARBON FIBER',
    season: 'Sezon 02',
    date: '2025-05-01',
    status: 'SOLD OUT',
    itemCount: 4,
    description: 'Serie inspirată din curse cu inserții de fibră de carbon. Cea care a pornit totul.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8',
  },
  {
    id: 'drop-s01',
    name: 'GENESIS',
    season: 'Sezon 01',
    date: '2024-12-01',
    status: 'SOLD OUT',
    itemCount: 3,
    description: 'Unde a început PANDAMA. Colecția fondatoare, acum piese de colecție.',
    image: '',
  },
];

// Archive collections
export interface Collection {
  id: string;
  name: string;
  year: string;
  season: string;
  description: string;
  productCount: number;
  image: string;
  highlight?: string;
}

export const ARCHIVE_COLLECTIONS: Collection[] = [
  {
    id: 'col-genesis',
    name: 'GENESIS',
    year: '2024',
    season: 'Iarnă',
    description: 'Colecția fondatoare care a stabilit identitatea PANDAMA. Performanță brută, nefiltrată.',
    productCount: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc',
    highlight: 'Colecția Fondatoare',
  },
  {
    id: 'col-carbon',
    name: 'CARBON FIBER',
    year: '2025',
    season: 'Primăvară',
    description: 'Moștenirea curselor întâlnește ingineria de precizie. Inserțiile de fibră de carbon stabilesc un nou standard.',
    productCount: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8',
  },
  {
    id: 'col-sakura',
    name: 'SAKURA',
    year: '2025',
    season: 'Toamnă',
    description: 'Estetica flori de cireș cu meșteșug japonez. Serie limitată pictată manual.',
    productCount: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z',
    highlight: 'Cea Mai Colecționată',
  },
  {
    id: 'col-neon',
    name: 'NEON STREETS',
    year: '2026',
    season: 'Iarnă',
    description: 'Energia vieții de noapte din Tokyo canalizată în echipament de înaltă performanță. Disponibil acum.',
    productCount: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8',
    highlight: 'Sezonul Curent',
  },
];
