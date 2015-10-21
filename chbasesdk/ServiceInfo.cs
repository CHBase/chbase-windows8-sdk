// (c) Microsoft. All rights reserved

using System;
using System.IO;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Windows.Storage;

namespace CHBase.Foundation
{
    public class ServiceInfo : IValidatable
    {
        public static readonly string USPPEServiceUrl = "https://chbaseplatform-ppev2.dev.grcdemo.com/platform/wildcat.ashx";
        public static readonly string USPPEShellUrl = "https://chbase-ppev2.dev.grcdemo.com";

        private const string FileName = "ServiceInfo";

        /// <summary>
        /// Required
        /// </summary>
        [XmlElement]
        public string ServiceUrl { get; set; }

        /// <summary>
        /// Required
        /// </summary>
        [XmlElement]
        public string ShellUrl { get; set; }

        public ServiceInfo()
        {
        }

        #region IValidatable Members

        public void Validate()
        {
            ServiceUrl.ValidateRequired("ServiceUrl");
            ShellUrl.ValidateRequired("ShellUrl");
        }

        #endregion

        public void InitForUSPPE()
        {
            ServiceUrl = @"https://chbaseplatform-ppev2.dev.grcdemo.com/platform/wildcat.ashx";
            ShellUrl = @"https://chbase-ppev2.dev.grcdemo.com";
        }



        public async Task Save()
        {
            StorageFile file = await ApplicationData.Current.LocalFolder.CreateFileAsync(
                FileName,
                CreationCollisionOption.ReplaceExisting);

            // Create a duplicate because this might be a ServiceInfoProxy
            // and you can't serialize internal classes.
            ServiceInfo duplicate = new ServiceInfo()
            {
                ServiceUrl = this.ServiceUrl,
                ShellUrl = this.ShellUrl
            };

            // We should have a lock around reads/writes, but you can't await inside a lock.
            await FileIO.WriteTextAsync(file, duplicate.ToXml());
        }

        public static async Task<ServiceInfo> Load()
        {
            try
            {
                // We should have a lock around reads/writes, but you can't await inside a lock.
                StorageFile file = await ApplicationData.Current.LocalFolder.GetFileAsync(FileName);
                string xml = await FileIO.ReadTextAsync(file);

                return CHBaseClient.Serializer.FromXml<ServiceInfo>(xml);
            }
            catch (IOException)
            {
                return null;
            }
        }
    }
}