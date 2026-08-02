export const Schema = z.object({
  系统: z.object({
    当前区域: z.enum(['绯田宅', '密室调教别荘']).prefault('绯田宅'),
    剧情阶段: z.enum(['日常', '被掳', '初调教', '沉沦', '终局']).prefault('日常'),
  }).prefault({}),
  悦子: z.object({
    堕落度: z.coerce.number().prefault(0).transform(value => _.clamp(value, 0, 100)),
    快感依赖: z.coerce.number().prefault(0).transform(value => _.clamp(value, 0, 100)),
    当前着装: z.object({
      整体风格: z.string().prefault('日常居家装'),
      上装: z.string().prefault('浅色家居服'),
      下装: z.string().prefault('家常长裤'),
      内衣: z.string().prefault('白色内衣'),
      袜子: z.string().prefault('棉袜'),
      鞋履: z.string().prefault('拖鞋'),
      束具: z.object({
        胸部: z.string().prefault('无'),
        手腕: z.string().prefault('无'),
        足踝: z.string().prefault('无'),
        腰部: z.string().prefault('无'),
        私处: z.string().prefault('无'),
        臀部: z.string().prefault('无'),
      }).prefault({}),
    }).prefault({}),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
