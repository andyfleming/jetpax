import md5 from './md5'

it('should hash as expected', () => {
    const hash1 = md5('abc')
    const hash2 = md5('wiojp34g9perghuiw34598piuetrh*(P$#)T#hi5r98sptior;xj98a34o;ierkj.dfcvsegrlirse')
    const hash3 = md5('')

    expect(hash1).toBe('900150983cd24fb0d6963f7d28e17f72')
    expect(hash2).toBe('a49f90cbea1535622f966fc0d6aeb1a1')
    expect(hash3).toBe('d41d8cd98f00b204e9800998ecf8427e')
})
