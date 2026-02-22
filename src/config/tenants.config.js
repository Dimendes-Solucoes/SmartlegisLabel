

const S3_HOST = 'https://smartlegis-production.s3.amazonaws.com'
const STAMP_PATH = '/tenancy/app/public/'

export const TENANTS_CONFIG = {

  'jc': {
    name: 'João Câmara',
    fullName: 'Câmara Municipal de João Câmara - RN',
    subdomain: 'jc',
    apiUrl: 'https://jcapp.smartlegis.net.br',
    apiBaseUrl: 'https://jcapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#1e40af',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_jc.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'bd': {
    name: 'Bodó',
    fullName: 'Câmara Municipal de Bodó - RN',
    subdomain: 'bd',
    apiUrl: 'https://bodoapp.smartlegis.net.br',
    apiBaseUrl: 'https://bodoapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_bd.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'pa': {
    name: 'Pedro Avelino',
    fullName: 'Câmara Municipal de Pedro Avelino - RN',
    subdomain: 'pa',
    apiUrl: 'https://paapp.smartlegis.net.br',
    apiBaseUrl: 'https://paapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pa.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'pp': {
    name: 'Pedra preta',
    fullName: 'Câmara Municipal de Pedra preta - RN',
    subdomain: 'pp',
    apiUrl: 'https://ppapp.smartlegis.net.br',
    apiBaseUrl: 'https://ppapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#7c3aed',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pp.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'cg': {
    name: 'Campo Grande',
    fullName: 'Câmara Municipal de Campo Grande - RN',
    subdomain: 'cg',
    apiUrl: 'https://cgapp.smartlegis.net.br',
    apiBaseUrl: 'https://cgapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#dc2626',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_cg.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'lajes': {
    name: 'Lajes',
    fullName: 'Câmara Municipal de Lajes - RN',
    subdomain: 'lajes',
    apiUrl: 'https://lajesapp.smartlegis.net.br',
    apiBaseUrl: 'https://lajesapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_lajes.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'cc': {
    name: 'Cerro Corá',
    fullName: 'Câmara Municipal de Cerro Corá - RN',
    subdomain: 'cc',
    apiUrl: 'https://ccapp.smartlegis.net.br',
    apiBaseUrl: 'https://ccapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_cc.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'parazinho': {
    name: 'Parazinho',
    fullName: 'Câmara Municipal de Parazinho - RN',
    subdomain: 'parazinho',
    apiUrl: 'https://parazinhoapp.smartlegis.net.br',
    apiBaseUrl: 'https://parazinhoapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_parazinho.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'jd': {
    name: 'Jandaíra',
    fullName: 'Câmara Municipal de Jandaíra - RN',
    subdomain: 'jd',
    apiUrl: 'https://jandairaapp.smartlegis.net.br',
    apiBaseUrl: 'https://jandairaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_jd.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'tp': {
    name: 'Triunfo Potiguar',
    fullName: 'Câmara Municipal de Triunfo Potiguar - RN',
    subdomain: 'tp',
    apiUrl: 'https://tpapp.smartlegis.net.br',
    apiBaseUrl: 'https://tpapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_tp.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'upanema': {
    name: 'Upanema',
    fullName: 'Câmara Municipal de Upanema - RN',
    subdomain: 'upanema',
    apiUrl: 'https://upnapp.smartlegis.net.br',
    apiBaseUrl: 'https://upnapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_upanema.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'ja': {
    name: 'Jardim de angicos',
    fullName: 'Câmara Municipal de Jardim de angicos - RN',
    subdomain: 'ja',
    apiUrl: 'https://jaapp.smartlegis.net.br',
    apiBaseUrl: 'https://jaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_ja.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'angicos': {
    name: 'Angicos',
    fullName: 'Câmara Municipal de Angicos - RN',
    subdomain: 'angicos',
    apiUrl: 'https://angicosapp.smartlegis.net.br',
    apiBaseUrl: 'https://angicosapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_angicos.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'crv': {
    name: 'CRV',
    fullName: 'Câmara Municipal de CRV - RN',
    subdomain: 'crv',
    apiUrl: 'https://crvapp.smartlegis.net.br',
    apiBaseUrl: 'https://crvapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_crv.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'goianinha': {
    name: 'Goianinha',
    fullName: 'Câmara Municipal de Goianinha - RN',
    subdomain: 'goianinha',
    apiUrl: 'https://goianinhaapp.smartlegis.net.br',
    apiBaseUrl: 'https://goianinhaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_goianinha.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'odb': {
    name: 'Olho-d\'água do borges',
    fullName: 'Câmara Municipal de Olho-d\'água do borges - RN',
    subdomain: 'odb',
    apiUrl: 'https://odbapp.smartlegis.net.br',
    apiBaseUrl: 'https://odbapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_odb.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'jucurutu': {
    name: 'Jucurutu',
    fullName: 'Câmara Municipal de Jucurutu - RN',
    subdomain: 'jucurutu',
    apiUrl: 'https://jucurutuapp.smartlegis.net.br',
    apiBaseUrl: 'https://jucurutuapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_jucurutu.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'sm': {
    name: 'Serra do mel',
    fullName: 'Câmara Municipal de Serra do mel - RN',
    subdomain: 'sm',
    apiUrl: 'https://smapp.smartlegis.net.br',
    apiBaseUrl: 'https://smapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_sm.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'lp': {
    name: 'Lagoa de pedras',
    fullName: 'Câmara Municipal de Lagoa de pedras - RN',
    subdomain: 'lp',
    apiUrl: 'https://lpapp.smartlegis.net.br',
    apiBaseUrl: 'https://lpapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_lp.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'sr': {
    name: 'São rafael',
    fullName: 'Câmara Municipal de São rafael - RN',
    subdomain: 'sr',
    apiUrl: 'https://srapp.smartlegis.net.br',
    apiBaseUrl: 'https://srapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_sr.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'bf': {
    name: 'Baia formosa',
    fullName: 'Câmara Municipal de Baia formosa - RN',
    subdomain: 'bf',
    apiUrl: 'https://bfapp.smartlegis.net.br',
    apiBaseUrl: 'https://bfapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_bf.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'sbn': {
    name: 'São bento do norte',
    fullName: 'Câmara Municipal de São bento do norte - RN',
    subdomain: 'sbn',
    apiUrl: 'https://sbnapp.smartlegis.net.br',
    apiBaseUrl: 'https://sbnapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_sbn.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'pureza': {
    name: 'Pureza',
    fullName: 'Câmara Municipal de Pureza - RN',
    subdomain: 'pureza',
    apiUrl: 'https://purezaapp.smartlegis.net.br',
    apiBaseUrl: 'https://purezaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pureza.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'afonsobezerra': {
    name: 'Afonso bezerra',
    fullName: 'Câmara Municipal de Afonso bezerra - RN',
    subdomain: 'afonsobezerra',
    apiUrl: 'https://abapp.smartlegis.net.br',
    apiBaseUrl: 'https://abapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_abapp.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'macaiba': {
    name: 'Macaíba',
    fullName: 'Câmara Municipal de Macaíba - RN',
    subdomain: 'macaiba',
    apiUrl: 'https://macaibaapp.smartlegis.net.br',
    apiBaseUrl: 'https://macaibaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#059669',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_macaiba.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'veracruz': {
    name: 'Vera Cruz',
    fullName: 'Câmara Municipal de Vera Cruz - RN',
    subdomain: 'veracruz',
    apiUrl: 'https://veracruzapp.smartlegis.net.br',
    apiBaseUrl: 'https://veracruzapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_veracruz.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'galinhos': {
    name: 'Galinhos',
    fullName: 'Câmara Municipal de Galinhos - RN',
    subdomain: 'galinhos',
    apiUrl: 'https://galinhosapp.smartlegis.net.br',
    apiBaseUrl: 'https://galinhosapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_galinhos.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'riodofogo': {
    name: 'Rio do Fogo',
    fullName: 'Câmara Municipal de Rio do Fogo - RN',
    subdomain: 'riodofogo',
    apiUrl: 'https://riodofogoapp.smartlegis.net.br',
    apiBaseUrl: 'https://riodofogoapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_riodofogo.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'caraubas': {
    name: 'Caraúbas',
    fullName: 'Câmara Municipal de Caraúbas - RN',
    subdomain: 'caraubas',
    apiUrl: 'https://caraubasapp.smartlegis.net.br',
    apiBaseUrl: 'https://caraubasapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_caraubas.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'bentofernandes': {
    name: 'Bento Fernandes',
    fullName: 'Câmara Municipal de Bento Fernandes - RN',
    subdomain: 'bentofernandes',
    apiUrl: 'https://bentofernandesapp.smartlegis.net.br',
    apiBaseUrl: 'https://bentofernandesapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_bentofernandes.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'pg': {
    name: 'Pedra Grande',
    fullName: 'Câmara Municipal de Pedra Grande - RN',
    subdomain: 'pg',
    apiUrl: 'https://pgapp.smartlegis.net.br',
    apiBaseUrl: 'https://pgapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pg.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'pb': {
    name: 'Poço Branco',
    fullName: 'Câmara Municipal de Poço Branco - RN',
    subdomain: 'pb',
    apiUrl: 'https://pbapp.smartlegis.net.br',
    apiBaseUrl: 'https://pbapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pb.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'snn': {
    name: 'Serra Negra do Norte',
    fullName: 'Câmara Municipal de Serra Negra do Norte - RN',
    subdomain: 'snn',
    apiUrl: 'https://snnapp.smartlegis.net.br',
    apiBaseUrl: 'https://snnapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_snn.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'serrinha': {
    name: 'Serrinha',
    fullName: 'Câmara Municipal de Serrinha - RN',
    subdomain: 'serrinha',
    apiUrl: 'https://serrinhaapp.smartlegis.net.br',
    apiBaseUrl: 'https://serrinhaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_serrinha.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'ssb': {
    name: 'Serra de São Bento',
    fullName: 'Câmara Municipal de Serra de São Bento - RN',
    subdomain: 'ssb',
    apiUrl: 'https://ssbapp.smartlegis.net.br',
    apiBaseUrl: 'https://ssbapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_ssb.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'tb': {
    name: 'Timbaúba dos Batistas',
    fullName: 'Câmara Municipal de Timbaúba dos Batistas - RN',
    subdomain: 'tb',
    apiUrl: 'https://tbapp.smartlegis.net.br',
    apiBaseUrl: 'https://tbapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_tb.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'varzea': {
    name: 'Varzea',
    fullName: 'Câmara Municipal de Varzea - RN',
    subdomain: 'varzea',
    apiUrl: 'https://varzeaapp.smartlegis.net.br',
    apiBaseUrl: 'https://varzeaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_varzea.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'felipeguerra': {
    name: 'Felipe Guerra',
    fullName: 'Câmara Municipal de Felipe Guerra - RN',
    subdomain: 'felipeguerra',
    apiUrl: 'https://felipeguerraapp.smartlegis.net.br',
    apiBaseUrl: 'https://felipeguerraapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_felipeguerra.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'tenenteananias': {
    name: 'Tenente Ananias',
    fullName: 'Câmara Municipal de Tenente Ananias - RN',
    subdomain: 'tenenteananias',
    apiUrl: 'https://tenenteananiasapp.smartlegis.net.br',
    apiBaseUrl: 'https://tenenteananiasapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_tenenteananias.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'brejinho': {
    name: 'Brejinho',
    fullName: 'Câmara Municipal de Brejinho - RN',
    subdomain: 'brejinho',
    apiUrl: 'https://brejinhoapp.smartlegis.net.br',
    apiBaseUrl: 'https://brejinhoapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_brejinho.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'cn': {
    name: 'Caiçara do Norte',
    fullName: 'Câmara Municipal de Caiçara do Norte - RN',
    subdomain: 'cn',
    apiUrl: 'https://cnapp.smartlegis.net.br',
    apiBaseUrl: 'https://cnapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_cn.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'lagoadanta': {
    name: 'Lagoa d\'Anta',
    fullName: 'Câmara Municipal de Lagoa d\'Anta - RN',
    subdomain: 'lagoadanta',
    apiUrl: 'https://lagoadantaapp.smartlegis.net.br',
    apiBaseUrl: 'https://lagoadantaapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_lagoadanta.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'mt': {
    name: 'Messias Targino',
    fullName: 'Câmara Municipal de Messias Targino - RN',
    subdomain: 'mt',
    apiUrl: 'https://mtapp.smartlegis.net.br',
    apiBaseUrl: 'https://mtapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_mt.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'teste': {
    name: 'Teste',
    fullName: 'Câmara Municipal de Teste - RN',
    subdomain: 'teste',
    apiUrl: 'https://sandbox.smartlegis.net.br',
    apiBaseUrl: 'https://sandbox.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: `${S3_HOST}${STAMP_PATH}BrasaoCamara_pp.png`,
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  },

  'default': {
    name: 'Dev',
    fullName: 'Câmara Municipal de Devs - RN',
    subdomain: 'localhost',
    apiUrl: import.meta.env.VITE_API_URL || 'https://devapp.smartlegis.net.br',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://devapp.smartlegis.net.br/api',
    theme: {
      primaryColor: '#3b82f6',
      brasao: 'https://smartlegis-dev.s3.amazonaws.com/tenancy/app/public/BrasaoCamara_pp.png',
    },
    features: {
      analytics: true,
      advancedReports: true,
    }
  }
}

export const DOMAIN_TO_TENANT = {
  'devexterno.smartlegis.net.br': 'default',
  'testeexterno.smartlegis.net.br': 'teste',
  'jcexterno.smartlegis.net.br': 'jc',
  'bdexterno.smartlegis.net.br': 'bd',
  'paexterno.smartlegis.net.br': 'pa',
  'ppexterno.smartlegis.net.br': 'pp',
  'cgexterno.smartlegis.net.br': 'cg',
  'lajesexterno.smartlegis.net.br': 'lajes',
  'ccexterno.smartlegis.net.br': 'cc',
  'parazinhoexterno.smartlegis.net.br': 'parazinho',
  'jdexterno.smartlegis.net.br': 'jd',
  'tpexterno.smartlegis.net.br': 'tp',
  'upanemaexterno.smartlegis.net.br': 'upanema',
  'jaexterno.smartlegis.net.br': 'ja',
  'angicosexterno.smartlegis.net.br': 'angicos',
  'crvexterno.smartlegis.net.br': 'crv',
  'goianinhaexterno.smartlegis.net.br': 'goianinha',
  'odbexterno.smartlegis.net.br': 'odb',
  'jucurutuexterno.smartlegis.net.br': 'jucurutu',
  'smexterno.smartlegis.net.br': 'sm',
  'lpexterno.smartlegis.net.br': 'lp',
  'srexterno.smartlegis.net.br': 'sr',
  'bfexterno.smartlegis.net.br': 'bf',
  'sbnexterno.smartlegis.net.br': 'sbn',
  'purezaexterno.smartlegis.net.br': 'pureza',
  'afonsobezerraexterno.smartlegis.net.br': 'afonsobezerra',
  'macaibaexterno.smartlegis.net.br': 'macaiba',
  'veracruzexterno.smartlegis.net.br': 'veracruz',
  'galinhosexterno.smartlegis.net.br': 'galinhos',
  'riodofogoexterno.smartlegis.net.br': 'riodofogo',
  'caraubasexterno.smartlegis.net.br': 'caraubas',
  'bentofernandesexterno.smartlegis.net.br': 'bentofernandes',
  'pgexterno.smartlegis.net.br': 'pg',
  'pbexterno.smartlegis.net.br': 'pb',
  'snnexterno.smartlegis.net.br': 'snn',
  'serrinhaexterno.smartlegis.net.br': 'serrinha',
  'ssbexterno.smartlegis.net.br': 'ssb',
  'tbexterno.smartlegis.net.br': 'tb',
  'varzeaexterno.smartlegis.net.br': 'varzea',
  'felipeguerraexterno.smartlegis.net.br': 'felipeguerra',
  'tenenteananiasexterno.smartlegis.net.br': 'tenenteananias',
  'brejinhoexterno.smartlegis.net.br': 'brejinho',
  'lagoadantaexterno.smartlegis.net.br': 'lagoadanta',
  'cnexterno.smartlegis.net.br': 'cn',
  'mtexterno.smartlegis.net.br': 'mt',
  'localhost': 'default',
  'localhost:8080': 'default',
  '127.0.0.1': 'default',
  '192.168.0.4:8080': 'default',
}

export function getTenantKeyFromHostname(hostname = window.location.hostname) {

  const cleanHostname = hostname.split(':')[0]

  if (DOMAIN_TO_TENANT[hostname]) {
    return DOMAIN_TO_TENANT[hostname]
  }

  if (DOMAIN_TO_TENANT[cleanHostname]) {
    return DOMAIN_TO_TENANT[cleanHostname]
  }

  const subdomain = cleanHostname.split('.')[0]

  if (TENANTS_CONFIG[subdomain]) {
    return subdomain
  }

  return 'default'
}

export function getCurrentTenantConfig(hostname = window.location.hostname) {
  const tenantKey = getTenantKeyFromHostname(hostname)
  return TENANTS_CONFIG[tenantKey] || TENANTS_CONFIG.default
}

export function getTenantConfig(tenantKey) {
  return TENANTS_CONFIG[tenantKey] || TENANTS_CONFIG.default
}
