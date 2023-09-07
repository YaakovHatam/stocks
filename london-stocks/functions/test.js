const fetch = require("node-fetch");

const finApi = require('./modules/finnhub-api');
const airTableApi = require("./modules/airtable-update");

const lse350stocks = [
   'III', '3IN', 'FOUR', '888', 'ASL', 'ADM', 'AGK', 'AAF', 'AJB', 'ATST',
   'ATT', 'AAL', 'ANTO', 'AO.', 'APAX', 'ASCL', 'ASHM', 'AHT', 'ABF', 'AGR',
   'AML', 'AZN', 'AUTO', 'AVST', 'AVV', 'AGT', 'AV.', 'AVON', 'BME', 'BAB', 'BA.', 'BGFD', 'BGS', 'USA', 'BBY', 'BNKR', 'BARC', 'BDEV', 'BBH', 'BBGI', 'BEZ', 'BWY', 'BKG', 'BHP', 'BIFF', 'BYG', 'BRSC', 'BRWM', 'BGSC', 'BOY', 'BP.', 'BRW', 'BATS', 'BLND', 'BVIC', 'BT.A', 'BNZL', 'BRBY', 'BYIT', 'CCR', 'CNE', 'CLDN', 'CPI', 'CAPC', 'CCL', 'CEY', 'CNA', 'CHG', 'CHRY', 'CINE', 'CTY', 'CSH', 'CKN', 'CBG', 'CLI', 'CMCX', 'COA', 'CCH', 'CPG', 'CCC', 'GLO', 'CTEC', 'CSP', 'CWK', 'CRST', 'CRH', 'CRDA', 'DCC', 'DPH', 'DLN', 'DGE', 'DPLM', 'DLG', 'DGOC', 'DC.', 'DOM', 'DOCS', 'DRX', 'DNLM', 'EZJ', 'EDIN', 'EWI', 'ECM', 'ELM', 'ENOG', 'ENT', 'ESNT', 'ERM', 'JEO', 'EVR',
   'EXPN', 'FCIT', 'FDM', 'FERG', 'FXPO', 'FCSS', 'FEV', 'FSV', 'FGT', 'FGP', 'FLTR', 'FSFL', 'FRAS', 'FRES', 'FUTR', 'GFS', 'GAW', 'GYS', 'GCP', 'DIGS', 'GSS', 'GNS', 'GSK', 'GLEN', 'GFTU', 'GRI', 'GPOR', 'UKW', 'GNC', 'GRG', 'HLMA', 'HMSO', 'HVPE', 'HL.', 'HAS', 'HTWS', 'HSL', 'HRI', 'HGT', 'HICL', 'HIK', 'HILS', 'HFG', 'SONG', 'HSX', 'HOC', 'HSV', 'HWDN', 'HSBA', 'IBST', 'ICGT', 'IGG', 'IMI', 'IEM', 'IMB', 'INCH', 'INDV', 'INF', 'IHP', 'IHG', 'ICP', 'IAG', 'INPP', 'ITRK', 'INVP', 'IPO', 'ITV', 'IWG', 'JDW', 'JD.', 'JLEN', 'JLG', 'JMAT', 'JAM', 'JMG', 'JESC', 'JFJ', 'JTC', 'JUP', 'JET', 'JUST', 'KNOS', 'KAZ', 'KGF', 'LRE', 'LAND', 'LWDB', 'LGEN', 'LIO', 'LLOY', 'LSEG', 'LMP', 'LXI', 'MNG', 'EMG', 'MKS', 'MSLH', 'MDC', 'MGGT', 'MRO', 'MRC', 'MCRO', 'MAB', 'MNDI', 'MONY', 'MNKS', 'MGAM', 'MGNS', 'MRW', 'MUT',
   'MYI', 'NEX', 'NG.', 'NWG', 'NCC', 'NETW', 'NXT', 'N91', 'OCDO', 'OSB', 'OXB', 'OXIG', 'PAGE', 'PIN', 'PAG', 'PSON', 'PNN', 'PSH', 'PSN', 'PNL', 'POG', 'PETS', 'PHNX', 'PTEC', 'PLUS', 'PCT', 'POLY', 'PLP', 'PFD', 'PHP', 'PFG', 'PRU', 'PRTC', 'PZC', 'QQ.', 'QLT', 'RNK', 'RAT', 'RB.', 'RDW', 'REL', 'RSW', 'RTO', 'RHIM', 'RMV', 'RIO', 'RCP', 'RR.', 'ROR', 'RDSA', 'RDSB', 'RMG', 'RSA', 'SBRE', 'SAFE', 'SGE', 'SBRY', 'SNN', 'SVS', 'SDP', 'SOI', 'SDR', 'SAIN', 'SMT', 'SGRO', 'SEQI', 'SRP', 'SVT', 'SHB', 'SIG', 'SRE', 'SN.', 'SMDS', 'SMIN', 'SSON', 'SKG', 'SCT', 'SXS', 'SPX', 'SPT', 'SSE', 'SSPG', 'STJ', 'SMP', 'STAN', 'SLA', 'SYNC', 'SYNT', 'TATE', 'TW.', 'TBCG', 'TEP', 'TMPL', 'TEM', 'TSCO', 'TRIG', 'TIFS', 'TCAP', 'TRY', 'TRN', 'TPK', 'BBOX', 'TUI', 'TLW', 'UDG', 'UKCM', 'ULE', 'ULVR', 'UTG', 'UU.',
   'VEC', 'VSVS', 'VCT', 'VEIL', 'VOF', 'VMUK', 'VTY', 'VVO', 'VOD', 'WOSG', 'WEIR', 'SMWH', 'WTB', 'WMH', 'WTAN', 'WIZZ', 'WG.', 'WKP', 'WWH', 'WPP', 'XPP'


]

// updateAirTable().then(res => console.log(res));
const apiKey = 'bpul0uvrh5rd45tk1jrg';
const from = new Date(2020, 0, 25);
const to = new Date(2020, 0, 26);

async function check(stockSymbol) {

   /**
    * o - List of open prices for returned candles.
   h - List of high prices for returned candles.
   l - List of low prices for returned candles.
   c - List of close prices for returned candles.
   v - List of volume data for returned candles.
   t - List of timestamp for returned candles.
   s - Status of the response. This field can either be ok or no_data.
    */
   const res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}.L&resolution=D&from=${from.getTime() / 1000}&to=${to.getTime() / 1000}&token=${apiKey}`)
   const jRes = await res.json();

   const resQuote = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}.L&token=${apiKey}`);
   const jResQuote = await resQuote.json();
   try {
      console.log('stockSymbol', stockSymbol, 'current:', jResQuote.c, 'old:', jRes.c[0]);
      return (((jResQuote.c - jRes.c[0]) / jRes.c[0]) < -0.4);
   } catch (ex) {
      console.log('err', stockSymbol, ex);
      return null;
   }

}


airTableApi.updateRecommendations();