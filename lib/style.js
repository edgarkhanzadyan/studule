const style = {
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',

  },
  flexRow: {
    display: 'flex',

  },
  studMeanWrap: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  studMean: {
    cursor: 'pointer',
    fontSize: '23',
  },
    logo: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '25px',
  },
  warningShow: {
    fontSize: '18px',
    fontFamily: 'Ubuntu Medium',
    fontWeight: 'bold',
    color: 'rgba(130, 11, 11, 0.89)',
    textAlign: 'center',
  },
  buttonWrapper: {
    display: 'flex',
  },
  warningNotShow: {
    display: 'none',
  },
  scheduleAdd: {
    display: 'block',
    marginTop:'0.5%',
    marginLeft:'1%',
    marginBottom:'0.5%',

    },
  inputs: {

  },
  classInput: {
    fontSize: '15px',
    fontFamily: 'ruly',
    color: '#062520',
  },
  timeInput: {

  },
  dayInput: {

  },
  homeworkInput: {
    fontSize: '15px',
    fontFamily: 'ruly',
    color: '#062520',
  },
  buttonDate: {
    minWidth: '80px',
    height: '25px',
    fontSize: '15px',
    padding: '0 25px',
    lineHeight: '25px',
    letterSpacing: '1px',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#0a3461',
    border: 'solid rgba(53, 53, 53, 0)',
    borderWidth: '4px 4px 4px 4px',
    borderRadius: '8px 8px 8px 8px',
  },
  eventBox: {
    border: '2px solid #062520',
    width: 'calc(100% / 8)',
    textAlign: 'center',
    },
    eventli: {
    height: '30px',
    border: '1px solid #062520',
    background:'rgba(44, 91, 105, 0.81)',
    margin:'1px',
    font: 'Lato',
    fontSize: '14px',
  },
  eventul: {
    listStyleType: 'none',
  },
  daysContainer: {
    display: 'flex',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainSchedule: {
    display: 'flex',
    height: '85vh',
  },
  timeSchedule: {
    border: '2px solid #062520',
    width: '67%',
    height: '100%',
    overflowY: 'scroll',
    marginLeft: '1%',
  },
  homeworkTab: {
    border: '5px solid #062520',
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginLeft: '1%',
    background: 'rgba(241, 241, 89, 0.81)',
  },

  homeworkItem: {
    fontSize: '14px',
    fontWeight:'bold',
    color: '#03695f',
    textDecoration:'blink',

  },
  homeworkLogo: {
    fontSize: '32px',
    fontFamily: 'Ubuntu Medium',
    fontStyle: 'oblique',
  },
  dontShow: {
    display: 'none',
  },
  boxClose: {
    float: 'right',
    height: '13px',
    width:'40px',
    cursor: 'pointer',
    color: 'rgba(189, 216, 91, 0.87)',
    border: '2px solid rgba(32, 61, 86, 0.42)',
    borderRadius: '15px',
    background: 'rgba(0, 0, 0, 0.82)',
    fontSize: '23.5px',
    font: 'Lucida Consola',
    fontWeight: 'bold',
    display: 'inline-block',
    lineHeight: '0px',
    padding: '8px 8px',
    marginBottom: '1px',
  }
};
module.exports = style;
