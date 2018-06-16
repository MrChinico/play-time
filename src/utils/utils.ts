export class Utils {
  
  public static secondToMinute ( sec: number ): string {

    let minute, second;
    if ( ( minute = Math.floor( sec / 60 ) ) < 10 ) {
      minute = '0' + minute;
    }
    if ( ( second = Math.floor( sec % 60 ) ) < 10 ) {
      second = '0' + second;
    }
    return minute + ':' + second;
  }

  public static byteToMegabytes ( byte: number ): string {
    return ( byte / 1024 / 1024 ).toFixed( 2 ) + 'MB';
  }

  public static toMediaType ( type: string ):string {
    return type.replace(/audio\//, '');
  }
}